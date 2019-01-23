type InstantSearch = any;
type SearchParameters = any;
type WidgetArgs = any;

interface Widget {
  render(options: WidgetArgs): void;
  init?(options: WidgetArgs): void;
  getConfiguration?(previous: SearchParameters): SearchParameters;
  dispose?(): void;
  // ...
}

/**
 * Connector
 */

interface RenderOptions<T = unknown> {
  widgetParams: T;
  instantSearchInstance: InstantSearch;
}

interface WidgetConnectorParams {
  // common attributes
}

type CreateWidget<T extends WidgetConnectorParams> = (widgetParams: T) => Widget;

type Render<T extends RenderOptions> = (renderOptions: T) => void;

// Useless for now -> find out how to make it generic - ConnectSearchBox
interface Connector<U extends WidgetConnectorParams, T extends RenderOptions<U>> {
  <V>(render: Render<T>, unmount: () => void): CreateWidget<U>;
}

// ------

interface SearchBoxRenderOptions<T> extends RenderOptions<T> {
  currentRefinement: string;
  refine: (value: string) => void;
}

interface SearchBoxConnectorParams extends WidgetConnectorParams {
  queryHook: (value: string, search: (value: string) => void) => void;
}

interface ConnectSearchBox {
  // How to make this generic?
  <U extends SearchBoxConnectorParams = SearchBoxConnectorParams>(render: Render<SearchBoxRenderOptions<U>>, unmount: () => void): CreateWidget<U>;
}

interface CustomSearchBoxWidgetParams extends SearchBoxConnectorParams {
  container: string;
}

const connectSearchBox: ConnectSearchBox = (render, dispose) => {
  return (widgetParams) => {
    // widgetParams.container
    widgetParams.queryHook

    return ({
      render() {
        render({
          currentRefinement: 'Hello',
          refine: (value: string) => {},
          instantSearchInstance: null,
          widgetParams,
        })
      },
  })};
}

const customSearchBox = connectSearchBox(
  ({ currentRefinement, refine, widgetParams }) => {
    // widgetParams.container;
    widgetParams.queryHook;
    refine(currentRefinement);
  },
  () => {}
);

customSearchBox({
  queryHook(next, search) {
    search(next);
  },
});

const customSearchBoxWithContainer = connectSearchBox<CustomSearchBoxWidgetParams>(
  ({ currentRefinement, refine, widgetParams }) => {
    widgetParams.container;
    widgetParams.queryHook;
    refine(currentRefinement);
  },
  () => {}
);

customSearchBoxWithContainer({
  container: '#searchBox',
  queryHook(next, search) {
    search(next);
  },
});

/**
 * Create widget
 */

interface SearchBoxWidgetParams extends SearchBoxConnectorParams {
  container: string | HTMLElement;
  placeholder: string;
}

type CreateSearchBox = CreateWidget<SearchBoxWidgetParams>;

const searchBox: CreateSearchBox = ({ container, queryHook, ...rest }) => {
  const createWidget = connectSearchBox<SearchBoxWidgetParams>(
    ({ currentRefinement, refine, widgetParams }) => {
      widgetParams.container
      widgetParams.queryHook
      widgetParams.placeholder
      refine(currentRefinement);
    },
    () => {}
  );

  return createWidget({
    ...rest,
    container,
    queryHook,
  });
};

searchBox({
  container: '#searchBox',
  placeholder: 'Apple, iPhone, ...',
  queryHook(next, search) {
    search(next);
  },
});
