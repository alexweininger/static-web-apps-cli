import { resolve } from "path";
const TJS = require('typescript-json-schema');

// optionally pass argument to schema generator
const settings = {
  required: true,
};

// optionally pass ts compiler options
const compilerOptions = {
  strictNullChecks: true,
};

const program = TJS.getProgramFromFiles(
[resolve(".ts")],
compilerOptions
);

// We can either get the schema for one file and one type...
const schema = TJS.generateSchema(program, "MyType", settings);

// ... or a generator that lets us incrementally get more schemas

const generator = TJS.buildGenerator(program, settings);

// generator can be also reused to speed up generating the schema if usecase allows:
const schemaWithReusedGenerator = TJS.generateSchema(program, "MyType", settings, [], generator);

// all symbols
const symbols = generator.getUserSymbols();

// Get symbols for different types from generator.
generator.getSchemaForSymbol("MyType");
generator.getSchemaForSymbol("AnotherType");
