// Import stylesheets
import './style.css';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

type ParamValue = string | string[] | { [key: string]: ParamValue };
console.log(
  convertToQueryParams({
    test: 'test',
    testNested: {
      one: 'one',
      two: 'two',
      three: ['test1', 'test2'],
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
      if (Array.isArray(value)) {
        return value.map((v, i) => ({ [`${paramKey}[${i}]`]: v }));
      }

      return convertToQueryParams(value, paramKey);
    })
    .flat()
    .reduce((a, b) => {
      Object.assign(a, b);
      return a;
    }, {});
}
