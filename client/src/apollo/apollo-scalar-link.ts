import { GraphQLScalarType, Kind, ValueNode, buildClientSchema } from 'graphql';
import { DateTime } from 'luxon';
import introspectionResult from 'src/gql/graphql.schema.json';
import { withScalars } from 'apollo-link-scalars'
export type TypeCoercer<T> = (value: unknown) => T;

const createParseLiteral = <T>(coerceType: TypeCoercer<T>): (ast: ValueNode) => T | void => {
	return (ast: ValueNode): T | void => {
		if (ast.kind !== Kind.STRING) {
			return undefined;
		}

		return coerceType(ast.value);
	};
};

const coerceType = (value: unknown): DateTime => {
	if (typeof value !== 'string') {
		throw new TypeError(`DateTime cannot represent a non string value: [${String(value)}]`);
	}

	const datetime = DateTime.fromISO(value);
	if (!datetime.isValid && datetime.invalidExplanation != null) {
		throw new TypeError(datetime.invalidExplanation);
	}

	return datetime;
};

export const DateTimeResolver =  new GraphQLScalarType({
  name: 'DateTime',
  description: 'Date custom scalar type',
  parseValue: coerceType,
  serialize: (value: unknown): string | null => {
		if (!DateTime.isDateTime(value)) {
			throw new TypeError(`DateTime cannot represent a non DateTime value: [${String(typeof value)}] given`);
		}

		return value.toISO();
	},
  parseLiteral: createParseLiteral(coerceType),
})

export const AbilityNameResolver = new GraphQLScalarType({
  name: 'AbilityName',
  description: 'AbilityName custom scalar type',
  parseValue: (value: unknown): string => value + '',
  serialize: (value: unknown): string | null => value === null ? null : value + '',
  parseLiteral: createParseLiteral((value: unknown): string => value + '')
})

export const resolvers = {
  DateTimeTz: DateTimeResolver,
  AbilityName: AbilityNameResolver
}

const schema = buildClientSchema(introspectionResult as unknown as any)

export const scalarLink = withScalars({ schema, typesMap: resolvers })
