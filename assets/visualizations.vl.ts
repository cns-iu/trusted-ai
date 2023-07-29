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
 * @param type type of data to graph
 * @returns parsed data
 */
export function parseNatData(values: SalaryInfo[], type: 'hourly' | 'annual' | 'emp'): unknown[] {
  const mostRecentData = values.find(value => value.year === 2022) || {}
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
 * @param type type of data to graph
 * @returns parsed data
 */
export function parseStateData(values: SalaryInfo[], type?: 'hourly' | 'annual' | 'emp'): SalaryInfo[] {
  const mostRecentData = values.filter(value => value.year === 2022);
  const allStates = Object.keys(stateIds);
  const statesWithData = mostRecentData.map(value => value.place_name);
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
      state: value.place_name,
      id: stateIds[value.place_name as string],
      mean: value[type === 'annual' ? 'a_mean' : 'h_mean'],
      tot_emp: value.tot_emp
    }
  })
}

/**
 * Parses data for industry salary visualization
 * @param values Salary data
 * @param type type of data to graph
 * @returns parsed data
 */
export function parseIndData(values: SalaryInfo[], type: 'hourly' | 'annual' | 'emp'): unknown[] {
  const sortBy = type === 'annual' ? 'a_mean' : 'h_mean';
  return values.filter(value => value.year === 2022)
    .sort((a, b) => (b[sortBy] || 0) - (a[sortBy] || 0))
    .map(value => {
      return {
        industry_name: value.industry_name,
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
    const entryNames = [entry.element_name, entry.sub_group, entry.group].filter(entry => entry)
    return {
      soc_id: entry.soc_id,
      name: entryNames[0],
      parent_group: entryNames[1],
      grandparent_group: entryNames.length === 3 ? entryNames[2] : null,
      x0: entry.x0,
      y0: entry.y0,
      x1: entry.x1,
      y1: entry.y1,
      depth: entry.level,
      children: entry.element_name ? 0 : 1,
      layers: layers,
      importance_rating: entry.importance_size,
      proficiency_level: entry.level_col,
      min_value: entry.min_anchor_val,
      min_descr: entry.min_anchor_descr,
      max_value: entry.max_anchor_val,
      max_descr: entry.max_anchor_descr
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
      emp_point: 0,
      per_change_10: occ.per_change_10,
      employed: occ.employed,
      industry: occ.industry_title,
    })
    result.push({
      year: 2031,
      emp_point: occ.per_change_10,
      per_change_10: occ.per_change_10,
      employed: occ.employed_10,
      industry: occ.industry_title
    })
  }
  return result;
}

/**
 * Creates national salary visualization
 * @param values salary data
 * @param type type of data to graph
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
      {
        name: 'labelFontSize',
        expr: `if (${window.innerWidth} <= 600, 10, 15)`
      },
    ],
    mark: {
      type: 'line',
      strokeWidth: 8,
      color: '#6750A4',
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
          labelFontSize: { expr: 'labelFontSize' },
          titleFontSize: { expr: 'axisTitleSize' },
          format: '.1~%',
          grid: false
        },
        scale: { domain: [0, 1] }
      },
      y: {
        field: 'salary',
        type: 'quantitative',
        stack: 'zero',
        title: type === 'annual' ? 'Salary ($/yr)' : 'Salary ($/hr)',
        axis: {
          labelFontSize: { expr: 'labelFontSize' },
          titleFontSize: { expr: 'axisTitleSize' },
          format: '$,.0f'
        }
      },
      tooltip: [
        {
          field: 'percentile',
          title: 'Percentile',
          format: '.1~%'
        },
        {
          field: 'salary',
          title: type === 'annual' ? 'Salary ($/yr)' : 'Salary ($/hr)',
          format: '$,.0f'
        }
      ]
    }
  };
}

/**
 * Creates state salary visualization
 * @param values salary data
 * @param section salary or employment section
 * @param type data type
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
        expr: `if (${window.innerWidth} <= 600, 13, 20)`
      },
      {
        name: 'gradientLabelSize',
        expr: `if (${window.innerWidth} <= 600, 12, 18)`
      },
      {
        name: 'gradientWidth',
        expr: `if (${window.innerWidth} <= 600, 10, 20)`
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
          scheme: 'purpleorange'
        },
        legend: {
          title: section === 'emp' ? 'Employed' : (type === 'annual' ? 'Salary ($/yr)' : 'Salary ($/hr)'),
          titleFontSize: { expr: 'gradientTitleSize' },
          gradientLength: { expr: 'gradientHeight' },
          gradientThickness: { expr: 'gradientWidth' },
          labelFontSize: { expr: 'gradientLabelSize' },
          format: value === 'mean' ? '$,f' : ',d',
          titlePadding: 10
        }
      },
      tooltip: [
        {
          field: 'state',
          title: 'State'
        },
        {
          field: value === 'mean' ? 'salaryValue' : 'populationValue',
          title: value === 'mean' ? (type === 'annual' ? 'Salary ($/yr)' : 'Salary ($/hr)') : 'Occupations',
          type: 'nominal',
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
 * @param type type of data to graph
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
      {
        name: 'labelFontSize',
        expr: `if (${window.innerWidth} <= 600, 10, 15)`
      },
      {
        name: 'labelLimit',
        expr: `if (${window.innerWidth} <= 600, 100, 300)`
      },
      {
        name: 'maxExtent',
        expr: `if (${window.innerWidth} <= 600, 150, 350)`
      },
      {
        name: 'barSize',
        expr: `if (${window.innerWidth} <= 600, 14, 28)`
      },
    ],
    encoding: {
      y: {
        field: 'industry_name',
        type: 'nominal',
        title: 'Industry',
        axis: {
          labelFontSize: { expr: 'labelFontSize' },
          titleFontSize: { expr: 'axisTitleSize' },
          labelLimit: { expr: 'labelLimit' },
          maxExtent: { expr: 'maxExtent' },
        },
        sort: {
          field: 'mid_box_salary'
        }
      },
      tooltip: [
        {
          field: 'industry_name',
          title: 'Industry'
        },
        {
          field: 'lower_whisker_salary',
          title: '10th percentile',
          format: '$,.0f'
        },
        {
          field: 'lower_box_salary',
          title: '25th percentile',
          format: '$,.0f'
        },
        {
          field: 'mid_box_salary',
          title: '50th percentile',
          format: '$,.0f'
        },
        {
          field: 'upper_box_salary',
          title: '75th percentile',
          format: '$,.0f'
        },
        {
          field: 'upper_whisker_salary',
          title: '90th percentile',
          format: '$,.0f'
        },
      ],
    },
    layer: [
      {
        mark: { type: 'errorbar', ticks: true },
        encoding: {
          x: {
            field: 'lower_whisker_salary',
            type: 'quantitative',
            scale: { zero: false },
            title: type === 'annual' ? 'Salary ($/yr)' : 'Salary ($/hr)',
            axis: {
              labelFontSize: { expr: 'labelFontSize' },
              titleFontSize: { expr: 'axisTitleSize' },
              format: '$,f',
              labelFlush: false,
              labelLimit: 0,
              grid: false
            }
          },
          x2: { field: 'upper_whisker_salary' },
        }
      },
      {
        mark: { type: 'bar', size: { expr: 'barSize' } },
        encoding: {
          x: { field: 'lower_box_salary', type: 'quantitative', },
          x2: { field: 'mid_box_salary' },
          color: { value: '#6750A4' },
        }
      },
      {
        mark: { type: 'bar', size: { expr: 'barSize' } },
        encoding: {
          x: { field: 'mid_box_salary', type: 'quantitative', },
          x2: { field: 'upper_box_salary' },
          color: { value: '#CFBCFF' },
        }
      },
      {
        mark: { type: 'tick', color: 'transparent' },
        encoding: {
          x: { field: 'mid_box_salary', type: 'quantitative' },
        }
      }
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
  const averageProficiency = values.filter(value => !value.element_name).reduce((a, b) => a + b.level_col, 0) / values.length; //use to set text color
  return {
    $schema: 'https://vega.github.io/schema/vega/v5.json',
    autosize: { type: 'none', 'contains': 'content' },
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
        update: 'if(width < 600, [22, 12, 10], [32, 20, 14])',
        on: [
          {
            events: { source: 'window', type: 'resize' },
            update: 'if(width < 600, [22, 12, 10], [32, 20, 14])'
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
        domain: { data: 'leaves', field: 'proficiency_level' },
        range: { scheme: 'purpleblue' }
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
        range: [0.4, 1.0, 1.0]
      }
    ],

    marks: [
      {
        type: 'rect',
        from: { data: 'nodes' },
        interactive: false,
        encode: {
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
                "{'Behavior': datum.name, 'Parent Group': datum.parent_group, 'Main Group': datum.grandparent_group, 'Importance Rating': datum.importance_rating, 'Proficiency Level': datum.proficiency_level, 'Min values': datum.min_value, 'Someone who is capable of (min)': datum.min_descr, 'Max value': datum.max_value, 'Someone who is capable of (max)': datum.max_descr}"
                : "{'Behavior': datum.name, 'Parent Group': datum.parent_group, 'Importance Rating': datum.importance_rating, 'Proficiency Level': datum.proficiency_level, 'Min values': datum.min_value, 'Someone who is capable of (min)': datum.min_descr, 'Max value': datum.max_value, 'Someone who is capable of (max)': datum.max_descr}"
            }
          },
          update: {
            x: { signal: "datum['x0'] * width" },
            y: { signal: "datum['y0'] * height" },
            x2: { signal: "datum['x1'] * width" },
            y2: { signal: "datum['y1'] * height" },
            fill: { scale: 'color', field: 'proficiency_level' },
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
            fill: { value: averageProficiency > 5 ? 'white' : 'black' },
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
      {
        name: 'circleSize',
        expr: `if (${window.innerWidth} <= 600, 100, 200)`
      },
      {
        name: 'lineWidth',
        expr: `if (${window.innerWidth} <= 600, 4, 8)`
      },
      {
        name: 'labelFontSize',
        expr: `if (${window.innerWidth} <= 600, 10, 15)`
      }
    ],
    encoding: {
      x: {
        field: 'emp_point',
        type: 'quantitative',
        title: 'Employment change',
        axis: {
          labelFontSize: { expr: 'labelFontSize' },
          titleFontSize: { expr: 'axisTitleSize' },
          labelExpr: "toString(datum.value) + '%'",
          labelFlush: false
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
          labelFontSize: { expr: 'labelFontSize' },
          titleFontSize: { expr: 'axisTitleSize' },
          labelLimit: { expr: 'labelLength' },
        },
        sort: ['National average']
      },
      tooltip: [
        {
          field: 'industry',
          title: 'Industry'
        },
        {
          field: 'employed',
          title: 'Total employed (thousands)'
        },
        {
          field: 'per_change_10',
          title: 'Employment Change (%)',
        },
      ],
    },
    layer: [
      {
        mark: {
          type: 'bar',
          height: { expr: 'lineWidth' }
        },
        encoding: {
          detail: {
            field: 'industry',
            type: 'nominal',
          },
          color: {
            value: {
              expr: "datum.per_change_10 > 0 ? 'purple' : 'orange'"
            }
          },
          opacity: { value: 0.5 },
          x: { field: 'emp_point' },
        },
        params: [{
          name: 'hover',
          select: {
            type: 'point',
            fields: ['employed'],
            nearest: true,
            on: 'mouseover',
            clear: 'mouseout'
          }
        }]
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
            title: 'Year',
            scale: { range: ['#CFBCFF', '#381E72'] },
            legend: {
              titleFontSize: { expr: 'axisTitleSize' },
              labelFontSize: { expr: 'axisTitleSize' },
              symbolSize: { expr: 'circleSize' },
              orient: window.innerWidth <= 600 ? 'bottom' : 'right'
            }
          },
          size: { value: { expr: 'circleSize' } },
          opacity: { value: 1 }
        }
      }
    ]
  };
}
