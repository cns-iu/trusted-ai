import { ProjectionInfo, SalaryInfo, TreemapData } from 'src/app/pages/profile-page/profile-page.component';
import { VisualizationSpec } from 'vega-embed';

/** Maps state names to ids for map visualization */
const stateIds: Record<string, string> = {
  Alabama: '01',
  Alaska: '02',
  'American Samoa': '60',
  Arizona: '04',
  Arkansas: '05',
  California: '06',
  'Commonwealth of the Northern Mariana Islands': '69',
  Colorado: '08',
  Connecticut: '09',
  Delaware: '10',
  'District of Columbia': '11',
  Florida: '12',
  Georgia: '13',
  Guam: '66',
  Hawaii: '15',
  Idaho: '16',
  Illinois: '17',
  Indiana: '18',
  Iowa: '19',
  Kansas: '20',
  Kentucky: '21',
  Louisiana: '22',
  Maine: '23',
  Maryland: '24',
  Massachusetts: '25',
  Michigan: '26',
  Minnesota: '27',
  Mississippi: '28',
  Missouri: '29',
  Montana: '30',
  Nebraska: '31',
  Nevada: '32',
  'New Hampshire': '33',
  'New Jersey': '34',
  'New Mexico': '35',
  'New York': '36',
  'North Carolina': '37',
  'North Dakota': '38',
  Ohio: '39',
  Oklahoma: '40',
  Oregon: '41',
  Pennsylvania: '42',
  'Puerto Rico': '72',
  'Rhode Island': '44',
  'South Carolina': '45',
  'South Dakota': '46',
  Tennessee: '47',
  Texas: '48',
  Utah: '49',
  Vermont: '50',
  Virginia: '51',
  'Virgin Islands': '78',
  Washington: '53',
  'West Virginia': '54',
  Wisconsin: '55',
  Wyoming: '56',
}

/**
 * Parses data for national salary visualization
 * @param values Salary data
 * @returns parsed data
 */
export function parseNatData(values: SalaryInfo[], type: 'hourly' | 'annual' | 'emp'): unknown[] {
  const mostRecentData = values.find(value => value['year'] === 2022) || {}
  return [
    {
      percentile: .10,
      salary: mostRecentData[type === 'annual' ? 'a_pct10' : 'h_pct10']
    },
    {
      percentile: .25,
      salary: mostRecentData[type === 'annual' ? 'a_pct25' : 'h_pct25']
    },
    {
      percentile: .50,
      salary: mostRecentData[type === 'annual' ? 'a_median' : 'h_median']
    },
    {
      percentile: .75,
      salary: mostRecentData[type === 'annual' ? 'a_pct75' : 'h_pct75']
    },
    {
      percentile: .90,
      salary: mostRecentData[type === 'annual' ? 'a_pct90' : 'h_pct90']
    }
  ]
}

/**
 * Parses data for state salary visualization
 * @param values Salary data
 * @returns parsed data
 */
export function parseStateData(values: SalaryInfo[], type?: 'hourly' | 'annual' | 'emp'): SalaryInfo[] {
  const mostRecentData = values.filter(value => value['year'] === 2022);
  const allStates = Object.keys(stateIds);
  const statesWithData = mostRecentData.map(value => value['place_name']);
  for (const state of allStates) {
    if (!statesWithData.includes(state)) {
      mostRecentData.push(
        {
          place_name: state,
          a_mean: undefined,
          h_mean: undefined
        }
      )
    }
  }
  return mostRecentData.map(value => {
    return {
      state: value['place_name'],
      id: stateIds[value['place_name'] as string],
      mean: value[type === 'annual' ? 'a_mean' : 'h_mean'],
      tot_emp: value['tot_emp']
    }
  })
}

/**
 * Parses data for industry salary visualization
 * @param values Salary data
 * @returns parsed data
 */
export function parseIndData(values: SalaryInfo[], type: 'hourly' | 'annual' | 'emp'): unknown[] {
  const sortBy = type === 'annual' ? 'a_mean' : 'h_mean';
  return values.filter(value => value['year'] === 2022)
    .sort((a, b) => (b[sortBy] || 0) - (a[sortBy] || 0))
    .map(value => {
      return {
        industry_name: value['industry_name'],
        lower_whisker_salary: value[type === 'annual' ? 'a_pct10' : 'h_pct10'],
        lower_box_salary: value[type === 'annual' ? 'a_pct25' : 'h_pct25'],
        mid_box_salary: value[type === 'annual' ? 'a_median' : 'h_median'],
        upper_box_salary: value[type === 'annual' ? 'a_pct75' : 'h_pct75'],
        upper_whisker_salary: value[type === 'annual' ? 'a_pct90' : 'h_pct90']
      }
    }).slice(0, 5)
}

/**
 * Parses data for treemap visualization
 * @param values Treemap data
 * @param layers Number of layers in treemap
 * @returns parsed data
 */
function parseTreemapData(values: TreemapData[], layers: number): unknown[] {
  return values.map(entry => {
    const entryNames = [entry['element_name'], entry['sub_group'], entry['group']].filter(entry => entry)
    return {
      name: entryNames[0],
      parent_group: entryNames[1],
      grandparent_group: entryNames.length === 3 ? entryNames[2] : null,
      x0: entry['x0'],
      y0: entry['y0'],
      x1: entry['x1'],
      y1: entry['y1'],
      depth: entry['level'],
      children: entry['element_name'] ? 0 : 1,
      layers: layers
    }
  })
}

/**
 * Parses data for occupation projection visualization
 * @param values Projection data
 * @returns projection data
 */
function parseProjectionData(values: ProjectionInfo[]): unknown[] {
  const result = [];
  for (const occ of values) {
    result.push({
      year: 2021,
      per_change_10: 0,
      employed: occ['employed'],
      industry: occ['industry_title'],
      increase: occ['per_change_10'] ? occ['per_change_10'] > 0 : false
    })
    result.push({
      year: 2031,
      per_change_10: occ['per_change_10'],
      employed: occ['employed_10'],
      industry: occ['industry_title']
    })
  }
  return result;
}

/**
 * Creates national salary visualization
 * @param values salary data
 * @returns visualization spec
 */
export function createSalaryNatPlot(values: SalaryInfo[], type: 'hourly' | 'annual' | 'emp'): VisualizationSpec {
  return {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    width: 'container',
    height: 'container',
    data: {
      values: parseNatData(values, type)
    },
    params: [
      {
        name: 'axisTitleSize',
        expr: `if (${window.innerWidth} <= 600, 14, 18)`
      },
    ],
    mark: {
      type: 'line',
      strokeWidth: 8,
      point: {
        filled: false,
        fill: 'white',
        size: 100
      }
    },
    encoding: {
      x: {
        field: 'percentile',
        type: 'quantitative',
        title: 'Percentile',
        axis: {
          values: [.10, .25, .50, .75, .90],
          labelExpr: "datum.value == .50 ? 'Median' : toString(datum.value * 100) + '%'",
          labelFontSize: 15,
          titleFontSize: { expr: 'axisTitleSize' },
          format: ".1~%"
        },
        scale: { domain: [0, 1] }
      },
      y: {
        field: 'salary',
        type: 'quantitative',
        stack: 'zero',
        title: type === 'annual' ? 'Salary (annual)' : 'Salary (hourly)',
        axis: {
          labelFontSize: 15,
          titleFontSize: { expr: 'axisTitleSize' },
          format: '$f'
        }
      },
      tooltip: [
        {
          field: 'percentile',
          title: 'Percentile',
          format: ".1~%"
        },
        {
          field: 'salary',
          title: 'Salary',
          format: '$d'
        }
      ]
    }
  };
}

/**
 * Creates state salary visualization
 * @param values salary data
 * @returns visualization spec
 */
export function createStatePlot(values: SalaryInfo[], section: string, type?: 'hourly' | 'annual' | 'emp'): VisualizationSpec {
  const value = section === 'salary' ? 'mean' : 'tot_emp';
  return {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    data: {
      values: parseStateData(values, type)
    },
    params: [
      {
        name: 'gradientHeight',
        expr: 'containerSize()[1] * .5'
      },
      {
        name: 'gradientTitleSize',
        expr: `if (${window.innerWidth} <= 600, 10, 20)`
      },
      {
        name: 'gradientLabelSize',
        expr: `if (${window.innerWidth} <= 600, 10, 16)`
      },
      {
        name: 'axisTitleSize',
        expr: `if (${window.innerWidth} <= 600, 12, 18)`
      }
    ],
    width: 'container',
    height: 'container',
    transform: [
      {
        lookup: 'id',
        from: {
          data: {
            url: 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json',
            format: {
              type: 'topojson',
              feature: 'states'
            }
          },
          key: 'id'
        },
        as: 'geo'
      },
      {
        calculate: `if(isValid(datum['${value}']) === false, true, false)`,
        as: 'isInvalid',
      },
      {
        calculate: `if(datum.isInvalid, 'No data', toString('$' + datum['${value}']))`,
        as: 'salaryValue'
      },
      {
        calculate: `if(datum.isInvalid, 'No data', toString(datum['${value}']))`,
        as: 'populationValue'
      },
    ],
    projection: { type: 'albersUsa' },
    mark: {
      type: "geoshape",
      stroke: "lightgray"
    },
    encoding: {
      shape: {
        field: 'geo',
        type: 'geojson'
      },
      color: {
        field: value,
        title: value === 'mean' ? 'Salary' : 'Occupations',
        type: 'quantitative',
        condition: {
          test: `isValid(datum['${value}']) === false`,
          value: '#aaa'
        },
        scale: {
          range: [
            '#FFF',
            '#CFBCFF',
            '#6750A4',
            '#381E72',
            '#000'
          ]
        },
        legend: {
          titleFontSize: { expr: 'gradientTitleSize' },
          gradientLength: { expr: 'gradientHeight' },
          gradientThickness: 10,
          labelFontSize: { expr: 'gradientLabelSize' },
          format: value === 'mean' ? '$f' : 'd'
        }
      },
      tooltip: [
        {
          field: 'state',
          title: 'State'
        },
        {
          field: value === 'mean' ? 'salaryValue' : 'populationValue',
          title: value === 'mean' ? (type === 'annual' ? 'Salary (annual)' : 'Salary (hourly)') : 'Occupations',
          type: 'nominal'
        }
      ]
    },
    config: {
      mark: {
        invalid: null
      }
    }
  };
}

/**
 * Creates industry salary visualization
 * @param values salary data
 * @returns visualization spec
 */
export function createSalaryIndPlot(values: SalaryInfo[], type: 'hourly' | 'annual' | 'emp'): VisualizationSpec {
  return {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    width: 'container',
    height: 'container',
    data: {
      values: parseIndData(values, type)
    },
    params: [
      {
        name: 'axisTitleSize',
        expr: `if (${window.innerWidth} <= 600, 14, 18)`
      },
    ],
    encoding: {
      y: {
        field: 'industry_name',
        type: 'nominal',
        title: 'Industry',
        axis: {
          labelFontSize: 15,
          titleFontSize: { expr: 'axisTitleSize' },
          labelLimit: window.innerWidth <= 600 ? 100 : 300,
          maxExtent: window.innerWidth <= 600 ? 150 : 350,
        },
        sort: {
          field: 'mid_box_salary'
        }
      },
    },
    layer: [
      {
        mark: { type: 'errorbar', ticks: true },
        encoding: {
          x: {
            field: 'lower_whisker_salary',
            type: 'quantitative',
            scale: { zero: false },
            title: type === 'annual' ? 'Salary (annual)' : 'Salary (hourly)',
            axis: {
              labelFontSize: 15,
              titleFontSize: { expr: 'axisTitleSize' },
              format: '$f'
            }
          },
          x2: { field: 'upper_whisker_salary' },
          tooltip: [
            {
              field: 'industry_name',
              title: 'Industry'
            },
            {
              field: 'lower_whisker_salary',
              title: '10th percentile',
              format: '$.0f'
            },
            {
              field: 'lower_box_salary',
              title: '25th percentile',
              format: '$.0f'
            },
            {
              field: 'mid_box_salary',
              title: '50th percentile',
              format: '$.0f'
            },
            {
              field: 'upper_box_salary',
              title: '75th percentile',
              format: '$.0f'
            },
            {
              field: 'upper_whisker_salary',
              title: '90th percentile',
              format: '$.0f'
            },
          ]
        }
      },
      {
        mark: { type: 'bar', size: 28 },
        encoding: {
          x: { field: 'lower_box_salary', type: 'quantitative' },
          x2: { field: 'upper_box_salary' },
          tooltip: [
            {
              field: 'industry_name',
              title: 'Industry'
            },
            {
              field: 'lower_whisker_salary',
              title: '10th percentile',
              format: '$.0f'
            },
            {
              field: 'lower_box_salary',
              title: '25th percentile',
              format: '$.0f'
            },
            {
              field: 'mid_box_salary',
              title: '50th percentile',
              format: '$.0f'
            },
            {
              field: 'upper_box_salary',
              title: '75th percentile',
              format: '$.0f'
            },
            {
              field: 'upper_whisker_salary',
              title: '90th percentile',
              format: '$.0f'
            },
          ],
          color: { field: 'industry_name', type: 'nominal', legend: null },
        }
      },
      {
        mark: { type: 'tick', color: 'white', size: 14 },
        encoding: {
          x: { field: 'mid_box_salary', type: 'quantitative' },
          tooltip: [
            {
              field: 'industry_name',
              title: 'Industry'
            },
            {
              field: 'lower_whisker_salary',
              title: '10th percentile'
            },
            {
              field: 'lower_box_salary',
              title: '25th percentile'
            },
            {
              field: 'mid_box_salary',
              title: '50th percentile'
            },
            {
              field: 'upper_box_salary',
              title: '75th percentile'
            },
            {
              field: 'upper_whisker_salary',
              title: '90th percentile'
            },
          ],
        }
      },
    ]
  };
}

/**
 * Creates treemap visuallization
 * @param values treemap data
 * @param layers layers in visualization
 * @returns treemap spec
 */
export function createTreemap(values: TreemapData[], layers: number): VisualizationSpec {
  return {
    $schema: 'https://vega.github.io/schema/vega/v5.json',
    autosize: { type: "none", "contains": 'content' },
    signals: [
      {
        name: 'width',
        update: 'containerSize()[0]',
        on: [
          {
            events: { source: 'window', type: 'resize' },
            update: 'containerSize()[0]'
          }
        ]
      },
      {
        name: 'height',
        update: 'containerSize()[1]',
        on: [
          {
            events: { source: 'window', type: 'resize' },
            update: 'containerSize()[1]'
          }
        ]
      },
      {
        name: 'treemapTextSize',
        update: "if(width < 550, [18, 12, 10], [28, 20, 14])",
        on: [
          {
            events: { source: 'window', type: 'resize' },
            update: "if(width < 550, [18, 12, 10], [28, 20, 14])"
          }
        ]
      }
    ],
    data: [
      {
        name: 'tree',
        values: parseTreemapData(values, layers)
      },
      {
        name: 'nodes',
        source: 'tree',
        transform: [{ type: 'filter', expr: 'datum.children' }]
      },
      {
        name: 'nodes2',
        source: 'nodes',
        transform: [{ type: 'filter', expr: `datum.depth == ${layers - 1}` }]
      },
      {
        name: 'leaves',
        source: 'tree',
        transform: [{ type: 'filter', expr: '!datum.children' }]
      }
    ],

    scales: [
      {
        name: 'color',
        type: 'ordinal',
        domain: { data: 'nodes2', field: 'name' },
        range: [
          '#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#e6550d',
          '#fd8d3c', '#fdae6b', '#fdd0a2', '#31a354', '#74c476',
          '#a1d99b', '#c7e9c0', '#756bb1', '#9e9ac8', '#bcbddc',
          '#dadaeb', '#636363', '#969696', '#bdbdbd', '#d9d9d9'
        ]
      },
      {
        name: 'size',
        type: 'ordinal',
        domain: [1, 2, 3],
        range: { signal: 'treemapTextSize' }
      },
      {
        name: 'opacity',
        type: 'ordinal',
        domain: [1, 2, 3],
        range: [0.3, 0.8, 1.0]
      }
    ],

    marks: [
      {
        type: 'rect',
        from: { data: 'nodes' },
        interactive: false,
        encode: {
          enter: {
            fill: { scale: 'color', field: 'name' }
          },
          update: {
            x: { signal: "datum['x0'] * width" },
            y: { signal: "datum['y0'] * height" },
            x2: { signal: "datum['x1'] * width" },
            y2: { signal: "datum['y1'] * height" },
          },
        }
      },
      {
        type: 'rect',
        from: { data: 'leaves' },
        encode: {
          enter: {
            stroke: { value: '#fff' },
            tooltip: {
              signal: layers === 3 ?
                "{'Behavior': datum.name, 'Parent Group': datum.parent_group, 'Main Group': datum.grandparent_group}"
                : "{'Behavior': datum.name, 'Parent Group': datum.parent_group}"
            }
          },
          update: {
            x: { signal: "datum['x0'] * width" },
            y: { signal: "datum['y0'] * height" },
            x2: { signal: "datum['x1'] * width" },
            y2: { signal: "datum['y1'] * height" },
            fill: { value: 'transparent' }
          },
          hover: {
            fill: { value: 'red' }
          }
        }
      },
      {
        type: 'text',
        from: { data: 'nodes' },
        interactive: false,
        encode: {
          enter: {
            font: { value: 'Helvetica Neue, Arial' },
            align: { value: 'center' },
            baseline: { value: 'middle' },
            fill: { value: '#000' },
            text: { field: 'name' },
            fontSize: { scale: 'size', field: 'depth' },
            fillOpacity: { scale: 'opacity', field: 'depth' }
          },
          update: {
            x: { signal: "0.5 * width * (datum['x0'] + datum['x1'])" },
            y: { signal: "0.5 * height * (datum['y0'] + datum['y1'])" }
          }
        },
        transform: [
          {
            type: 'label',
            anchor: ['top', 'bottom'],
            size: { signal: '[width, height]' },
          }
        ]
      }
    ]
  }
}

/**
 * Creates projections visualization
 * @param values Projections data
 * @returns projections plot
 */
export function createProjectionsPlot(values: ProjectionInfo[]): VisualizationSpec {
  return {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: "A ranged dot plot that uses 'layer' to convey changing life expectancy for the five most populous countries (between 1955 and 2000).",
    width: 'container',
    height: 'container',
    autosize: {
      resize: true
    },
    data: { values: parseProjectionData(values) },
    params: [
      {
        name: 'axisTitleSize',
        expr: `if (${window.innerWidth} <= 600, 14, 18)`
      },
      {
        name: 'labelLength',
        expr: `if (${window.innerWidth} <= 600, 100, 200)`
      },
    ],
    encoding: {
      x: {
        field: 'per_change_10',
        type: 'quantitative',
        title: 'Employment % change',
        axis: {
          labelFontSize: 15,
          titleFontSize: { expr: 'axisTitleSize' }
        }
      },
      y: {
        field: 'industry',
        type: 'nominal',
        title: 'Industry',
        axis: {
          offset: 5,
          ticks: false,
          domain: false,
          labelFontSize: 15,
          titleFontSize: { expr: 'axisTitleSize' },
          labelLimit: { expr: 'labelLength' },
        },
        sort: ['National average']
      }
    },
    layer: [
      {
        mark: {
          type: 'line',
          strokeWidth: 5,
        },
        encoding: {
          detail: {
            field: 'industry',
            type: 'nominal',
          },
          color: {
            value: {
              expr: "datum.increase ? 'blue' : '#db646f'"
            }
          }
        }
      },
      {
        mark: {
          type: 'point',
          filled: true,
        },
        encoding: {
          color: {
            field: 'year',
            type: 'ordinal',
            title: 'Year'
          },
          size: { value: 150 },
          opacity: { value: 1 },
          tooltip: [
            {
              field: 'industry',
              title: 'Industry'
            },
            {
              field: 'employed',
              title: 'Employment (thousands)'
            },
            {
              field: 'per_change_10',
              title: 'Employment % Change'
            },
          ],
        }
      }
    ]
  };
}
