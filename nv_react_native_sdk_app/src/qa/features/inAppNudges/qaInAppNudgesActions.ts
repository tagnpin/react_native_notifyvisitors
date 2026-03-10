import { FeatureActionProps } from '../../../shared/types/actions';

const qaInAppNudgesActions: FeatureActionProps[] = [
  {
    key: 'qaNativeDisplay',
    title: 'Native Display',
    description: 'Show native display inside your parent view',
    actionLabel: 'Show Native Display',
    showResult: true,
    resultTitle: 'QA Native Display Finalized:',
    accordionDefaultExpanded: true,
    inputParams: {
      propertyName: {
        type: 'string',
        required: true,
        placeholder: 'Enter property name of configerd Native Display',
      },
    },
    execute: async payload => {
      const { propertyName } = payload as { propertyName: string };
      const finalPropertyName = propertyName?.trim();
      if (!finalPropertyName) {
        throw new Error('propertyName is required');
      }
      console.log('Show Native Display with propertyName:', finalPropertyName);
      return Promise.resolve({ propertyName: finalPropertyName });
    },
  },
];

export { qaInAppNudgesActions };
