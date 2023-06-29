import { SalaryInfo } from 'src/app/pages/profile-page/profile-page.component';
import { VisualizationSpec } from 'vega-embed'

const stateIds: Record<string, string> = {
  Alabama: '01',
  Alaska: '02',
  'American Samoa': '60',
  Arizona: '04',
  Arkansas: '05',
  California: '06',
  "Commonwealth of the Northern Mariana Islands": '69',
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

function parseData(values: SalaryInfo[]): SalaryInfo[] {
  return values.filter(value => value['year'] === 2022).map(value => {
    return {
      state: value['place_name'],
      id: stateIds[value['place_name'] as string],
      a_mean: value['a_mean']
    }
  })
}

export function createSalaryStatePlot(values: SalaryInfo[]): VisualizationSpec {
  console.log(parseData(values))
  return {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    data: {
      values: parseData(values)
    },
    width: 1000,
    height: 800,
    transform: [
      {
        lookup: 'id',
        from: {
          data: {
            url: 'assets/data/states-10m.json',
            format: {
              type: 'topojson',
              feature: 'states'
            }
          },
          key: 'id'
        },
        as: 'geo'
      }
    ],
    projection: { type: 'albersUsa' },
    mark: 'geoshape',
    encoding: {
      shape: {
        field: 'geo',
        type: 'geojson'
      },
      color: {
        field: "a_mean",
        type: "quantitative"
      }
    }
  };
}
