import type { BaseTransformation } from '../../types/index.ts';

/**
 * To min value transformation action type.
 */
export interface ToMinValueAction<
  TInput extends string | number | bigint | Date,
  TRequirement extends TInput,
> extends BaseTransformation<TInput, TInput, never> {
  /**
   * The action type.
   */
  readonly type: 'to_min_value';

  /**
   * The minimum value.
   */
  requirement: TRequirement;
}

/**
 * Creates a to min value transformation action.
 *
 * @param requirement The minimum value.
 *
 * @returns A to min value action.
 */
export function toMinValue<
  TInput extends string | number | bigint | Date,
  TRequirement extends TInput,
>(requirement: TRequirement): ToMinValueAction<TInput, TRequirement> {
  return {
    kind: 'transformation',
    type: 'to_min_value',
    async: false,
    requirement,
    _run(dataset) {
      dataset.value =
        dataset.value < this.requirement ? this.requirement : dataset.value;
      return dataset;
    },
  };
}