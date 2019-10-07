# pdfmake-font-generator

CLI to generate custom fonts to use them with [pdfmake](http://pdfmake.org)

## Installation

You can install it locally as a dev dependency, since it is only used to generate your custom fonts

> $ npm install pdfmake-font-generator --save-dev

or globally

> $ npm install -g pdfmake-font-generator

## Usage

Once installed, you can run the command *pdfmakefg* which receives two arguments, the first one is the directory where your custom fonts are located and the second one is the name of the file (output) that will be generated. This generated file contains your custom fonts and this one is you need to import in your pdfmake project.

> $ pdfmakefg /path/of/your/custom/fonts /path/of/the/output/file.js

Internally, this script generates an object where each key is the name of the file and its value is the corresponding content.

**NOTE:** The first argument is a DIRECTORY and the second one is a filename (it's important to create the file with .js extension). The file will be generated in the given path. If an error is thrown, create the file manually.

### Example

In the root project there is a **my-fonts** directory which contains the font files (example: Roboto-Regular.ttf) and a **pdf** directory which contains another one called **fonts**. Now you run the command:

> $ pdfmakefg ./my-fonts ./pdf/fonts/custom-fonts.js

The script gets all the font files into the **my-fonts** directory, then it proccesses these files and generates a *custom-fonts.js* file in the **/pdf/fonts/** directory. Now, you can import the generated fonts in your project.

```javascript
// If you use pdfmake
import pdfMake from "pdfmake/build/pdfmake";
// instead of import the default fonts  (import pdfFonts from "pdfmake/build/vfs_fonts";), you import your custom fonts
import pdfFonts from "./pdf/fonts/custom-fonts"; // The path of your custom fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;
```

You can learn more about custom fonts [here](https://pdfmake.github.io/docs/fonts/custom-fonts-client-side/)
