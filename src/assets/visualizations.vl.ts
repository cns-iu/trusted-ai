import { ProjectionInfo, SalaryInfo } from 'src/app/pages/profile-page/profile-page.component';
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
function parseNatData(values: SalaryInfo[]): unknown[] {
  const mostRecentData = values[values.length - 1] || {}
  return [
    {
      percentile: 10,
      salary: mostRecentData['a_pct10']
    },
    {
      percentile: 25,
      salary: mostRecentData['a_pct25']
    },
    {
      percentile: 50,
      salary: mostRecentData['a_median']
    },
    {
      percentile: 75,
      salary: mostRecentData['a_pct75']
    },
    {
      percentile: 90,
      salary: mostRecentData['a_pct90']
    }
  ]
}

/**
 * Parses data for state salary visualization
 * @param values Salary data
 * @returns parsed data
 */
function parseStateData(values: SalaryInfo[]): SalaryInfo[] {
  const mostRecentData = values.filter(value => value['year'] === 2022);
  const allStates = Object.keys(stateIds);
  const statesWithData = mostRecentData.map(value => value['place_name']);
  for (const state of allStates) {
    if (!statesWithData.includes(state)) {
      mostRecentData.push(
        {
          place_name: state,
          a_mean: undefined
        }
      )
    }
  }
  return mostRecentData.map(value => {
    return {
      state: value['place_name'],
      id: stateIds[value['place_name'] as string],
      a_mean: value['a_mean'],
      tot_emp: value['tot_emp']
    }
  })
}

/**
 * Parses data for industry salary visualization
 * @param values Salary data
 * @returns parsed data
 */
function parseIndData(values: SalaryInfo[]): unknown[] {
  return values.filter(value => value['year'] === 2022)
    .sort((a, b) => (b.a_mean || 0) - (a.a_mean || 0))
    .map(value => {
      return {
        industry_name: value['industry_name'],
        lower_box_salary: value['a_pct25'],
        upper_box_salary: value['a_pct75'],
        mid_box_salary: value['a_median'],
        lower_whisker_salary: value['a_pct10'],
        upper_whisker_salary: value['a_pct90']
      }
    }).slice(0, 5)
}

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
export function createSalaryNatPlot(values: SalaryInfo[]): VisualizationSpec {
  return {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    width: 'container',
    height: 'container',
    autosize: {
      resize: true
    },
    data: {
      values: parseNatData(values)
    },
    params: [
      {
        name: 'axisTitleSize',
        expr: `if (${window.innerWidth} <= 480, 14, 18)`
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
          values: [10, 25, 50, 75, 90],
          labelExpr: "datum.value == 50 ? 'Median' : datum.value",
          labelFontSize: 15,
          titleFontSize: { expr: 'axisTitleSize' }
        }
      },
      y: {
        field: 'salary',
        type: 'quantitative',
        stack: 'zero',
        title: 'Salary (annual)',
        axis: {
          labelFontSize: 15,
          titleFontSize: { expr: 'axisTitleSize' }
        }
      },
      tooltip: [
        {
          field: 'percentile',
          title: 'Percentile'
        },
        {
          field: 'salary',
          title: 'Salary'
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
export function createStatePlot(values: SalaryInfo[], section: string): VisualizationSpec {
  const value = section === 'salary' ? 'a_mean' : 'tot_emp';
  return {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    data: {
      values: parseStateData(values)
    },
    params: [
      {
        name: 'gradientHeight',
        expr: 'containerSize()[1] * .5'
      },
      {
        name: 'gradientTitleSize',
        expr: `if (${window.innerWidth} <= 480, 10, 20)`
      },
      {
        name: 'gradientLabelSize',
        expr: `if (${window.innerWidth} <= 480, 10, 16)`
      },
      {
        name: 'axisTitleSize',
        expr: `if (${window.innerWidth} <= 480, 12, 18)`
      },
    ],
    width: 'container',
    height: 'container',
    autosize: {
      resize: true,
      contains: 'padding'
    },
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

    ],
    projection: { type: 'albersUsa' },
    mark: {
      type: "geoshape",
      stroke: "dimgray"
    },
    encoding: {
      shape: {
        field: 'geo',
        type: 'geojson'
      },
      color: {
        field: value,
        title: value === 'a_mean' ? 'Salary' : 'Occupations',
        type: 'quantitative',
        condition: {
          test: `isValid(datum['${value}']) === false`,
          value: '#aaa'
        },
        legend: {
          titleFontSize: { expr: 'gradientTitleSize' },
          gradientLength: { expr: 'gradientHeight' },
          gradientThickness: 10,
          labelFontSize: { expr: 'gradientLabelSize' }
        }
      },
      tooltip: [
        {
          field: 'state',
          title: 'State'
        },
        {
          field: value,
          title: value === 'a_mean' ? 'Salary (annual)' : 'Occupations'
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
export function createSalaryIndPlot(values: SalaryInfo[]): VisualizationSpec {
  return {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    width: 'container',
    height: 'container',
    autosize: {
      resize: true
    },
    data: {
      values: parseIndData(values)
    },
    params: [
      {
        name: 'axisTitleSize',
        expr: `if (${window.innerWidth} <= 480, 14, 18)`
      },
    ],
    encoding: {
      x: {
        field: 'industry_name',
        type: 'nominal',
        title: 'Industry',
        axis: {
          labelFontSize: 15,
          titleFontSize: { expr: 'axisTitleSize' },
          labelAngle: -45,
          labelLimit: 100,
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
          y: {
            field: 'lower_whisker_salary',
            type: 'quantitative',
            scale: { zero: false },
            title: 'Salary (annual)',
            axis: {
              labelFontSize: 15,
              titleFontSize: { expr: 'axisTitleSize' }
            }
          },
          y2: { field: 'upper_whisker_salary' },
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
          ]
        }
      },
      {
        mark: { type: 'bar', size: 28 },
        encoding: {
          y: { field: 'lower_box_salary', type: 'quantitative' },
          y2: { field: 'upper_box_salary' },
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
          color: { field: 'industry_name', type: 'nominal', legend: null },
        }
      },
      {
        mark: { type: 'tick', color: 'white', size: 14 },
        encoding: {
          y: { field: 'mid_box_salary', type: 'quantitative' },
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

export function createProjectionsPlot(values: ProjectionInfo[]): VisualizationSpec {
  console.log(parseProjectionData(values))
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
        expr: `if (${window.innerWidth} <= 480, 14, 18)`
      },
      {
        name: 'labelLength',
        expr: `if (${window.innerWidth} <= 480, 100, 200)`
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
