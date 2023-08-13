import { nanoid } from '@reduxjs/toolkit';

export const groupByTypeDynamically = (data, fieldForGoup) => {
  const types = data?.reduce((acc, current) => {
    if (!acc.includes(current[fieldForGoup])) acc.push(current[fieldForGoup]);
    return acc;
  }, []);

  const groupedByType = data?.reduce(
    (acc, current) => {
      acc
        .find((container) => container.type === current[fieldForGoup])
        .push(current);
      return acc;
    },
    types.map((type) => {
      const container = [];
      container.type = type;

      return container;
    })
  );

  return groupedByType;
};

export const groupByTypeHardcode = (data) => {
  const groupedByType = data?.reduce(
    (acc, current) => {
      const [schemes, tables] = acc;
      switch (current['TYPE']) {
        // TODO: fix typo in TYPE
        case 'shema': {
          schemes.push(current);
          break;
        }
        case 'table': {
          tables.push(current);
          break;
        }
        default:
          break;
      }

      return acc;
    },
    [[], []]
  ) ?? [[], []];

  return groupedByType;
};

export const getSchemesTree = (data) => {
  return data?.reduce((accSchemes, current, _, nodes) => {
    const [currentSchemeName] = current['VALUE'].split('.');

    if (!accSchemes.find((scheme) => scheme.name === currentSchemeName)) {
      accSchemes.push({
        id: nanoid(),
        name: currentSchemeName,
        type: 'scheme',
        children: nodes
          ?.filter(
            (node) => node?.['VALUE']?.split('.')[0] === currentSchemeName
          )
          ?.reduce(
            (acc, current) => {
              acc
                .find((container) => container.type === current['TYPE'])
                .push(current);
              return acc;
            },
            nodes
              .filter(
                (node) => node?.['VALUE']?.split('.')[0] === currentSchemeName
              )
              ?.reduce((acc, current) => {
                if (!acc.includes(current['TYPE'])) acc.push(current['TYPE']);
                return acc;
              }, [])
              .map((type) => {
                const container = [];
                container.type = type;

                return container;
              })
          )
          ?.map((group) => ({
            id: nanoid(),
            parentName: currentSchemeName,
            name: group[0]?.['TYPE'],
            type: 'group',
            children: group.map((node) => ({
              id: nanoid(),
              parentName: currentSchemeName,
              name: node?.['VALUE']?.split('.')[1],
              type: node?.['TYPE'],
            })),
          })),
      });
    }

    return accSchemes;
  }, []);
};
