<!-- 
README Template
Placeholders: {{...}} from project.settings.jsonc
Dynamic blocks: {{::command:...::}} resolved at generation time
-->

# {{project:fullname}} · 
[![license](https://img.shields.io/npm/l/{{scope}}/{{lib}})](https://github.com/{{git:username}}/{{git:repository-name}}/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/{{scope}}/{{lib}})](https://www.npmjs.com/package/{{scope}}/{{lib}})
[![jsDelivr CDN](https://data.jsdelivr.com/v1/package/npm/{{scope}}/{{lib}}/badge)](https://www.jsdelivr.com/package/npm/{{scope}}/{{lib}})
[![minzipped size](https://badgen.net/bundlephobia/minzip/{{scope}}/{{lib}})](https://bundlephobia.com/package/{{scope}}/{{lib}})

{{description}}

## Information
- **Current Version:** {{version}}
- **Author:** {{author}}
- **Website:** {{author:website}}
- **License:** {{license}}
- **NPM:** [https://www.npmjs.com/package/{{scope}}/{{lib}}](https://www.npmjs.com/package/{{scope}}/{{lib}})
- **API Documentation:** [View online](https://{{git:username}}.github.io/{{git:repository-name}}/)

## 📖 Table of Contents

{{::readme-content:toc::}}
- [🔁 Version Access](#-version-access)
- [📂 Example files and test files](#-example-files-and-test-files)
- [📄 License](#-license)
- [🧠 Author](#-author)

{{::readme-content::}}

## 🔁 Version Access

Access the library version directly:
```js
import * as myLib from "{{scope}}/{{lib}}";

myLib.Version // → e.g., "{{version}}"
```

## 📂 Example files and test files

Example files can be found under `{{examplesFolder}}` folder and/or  `{{testFolder}}/units` folder
(You can treat these test files as examples)


## 📄 License

{{license:short-text}}

## 🧠 Author

**{{author}}**
Website: [{{author:website}}]({{author:website}})

GitHub: [{{git:username}}](https://github.com/{{git:username}})

X: [{{author:twitter:username}}](https://x.com/{{author:twitter:username}})

LinkedIn: [{{author:linkedin:username}}](https://www.linkedin.com/in/{{author:linkedin:username}})