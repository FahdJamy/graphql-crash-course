import { buildSchema } from "graphql";

export const userSchema = buildSchema(`
	schema {
		query:
		mutation:
	}
	type RootQuery {}
	type RootMutation {}
`);
