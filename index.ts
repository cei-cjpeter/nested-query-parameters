// Import stylesheets
import './style.css';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

type ParamValue = string | { [key: string]: ParamValue };
console.log(
  convertToQueryParams({
    test: 'test',
    testNested: {
      one: 'one',
      two: 'two',
      level2: {
        twoOne: 'twoOne',
      },
    },
  })
);

function convertToQueryParams(
  params: Record<string, ParamValue>,
  parentKey?: string
): Record<string, string> {
  return Object.keys(params)
    .map((key) => {
      let paramKey = key;
      let value = params[key];
      if (parentKey) {
        paramKey = `${parentKey}.${key}`;
      }
      if (typeof value === 'string') {
        return { [paramKey]: value };
      }

      return convertToQueryParams(value, paramKey);
    })
    .reduce((a, b) => {
      Object.assign(a, b);
      return a;
    }, {});
}
