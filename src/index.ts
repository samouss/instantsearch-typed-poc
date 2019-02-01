type InstantSearch = any;
type SearchParameters = any;
type WidgetArgs = any;

export interface Widget {
  render(options: WidgetArgs): void;
  init?(options: WidgetArgs): void;
  getConfiguration?(previous: SearchParameters): SearchParameters;
  dispose?(): void;
  // ...
}

/**
 * Connector
 */

export interface RenderOptions<T = unknown> {
  widgetParams: T;
  instantSearchInstance: InstantSearch;
}

export interface WidgetConnectorParams {
  // common attributes
}

export type CreateWidget<T extends WidgetConnectorParams> = (widgetParams: T) => Widget;

export type Renderer<T extends RenderOptions> = (renderOptions: T) => void;

// Useless for now -> find out how to make it generic - ConnectSearchBox
// interface Connector<U extends WidgetConnectorParams, T extends RenderOptions<U>> {
//   <V>(render: Renderer<T>, unmount: () => void): CreateWidget<U>;
// }

// interface Connector<T extends WidgetConnectorParams, U<V> extends RenderOptions<V>> {
//   <W>(render: Renderer<U<W>>, unmount: () => void): CreateWidget<T & W>;
// }

/**
 * ConnectSearchBox
 */

interface SearchBoxRenderOptions<T> extends RenderOptions<T> {
  currentRefinement: string;
  refine: (value: string) => void;
}

interface SearchBoxConnectorParams extends WidgetConnectorParams {
  queryHook: (value: string, search: (value: string) => void) => void;
}

// How to infer this from the connector? We can use namespace?
type SearchBoxRenderer<T> = Renderer<SearchBoxRenderOptions<SearchBoxConnectorParams & T>>

interface ConnectSearchBox {
  // How to make this generic?
  <T>(render: SearchBoxRenderer<T>, unmount: () => void): CreateWidget<SearchBoxConnectorParams & T>;
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

type CreateSearchBox = CreateWidget<SearchBoxWidgetParams>;

interface SearchBoxWidgetParams extends SearchBoxConnectorParams {
  container: string | HTMLElement;
  placeholder: string;
}

const renderSearchBox: SearchBoxRenderer<SearchBoxWidgetParams> = ({ currentRefinement, refine, widgetParams }) => {
  widgetParams.container
  widgetParams.queryHook
  widgetParams.placeholder
  refine(currentRefinement);
};

const searchBox: CreateSearchBox = ({ container, queryHook, ...rest }) => {
  // It would be nice to infer the type from the one above
  const createWidget = connectSearchBox<SearchBoxWidgetParams>(
    renderSearchBox,
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

/**
 * Create widget with partial widget params
 */

type CreateSearchBoxQueryHook = CreateWidget<SearchBoxQueryHookWidgetParams>;

interface SearchBoxQueryHookWidgetParams {
  container: string | HTMLElement;
  placeholder: string;
}

const renderSearchBoxWithQueryHook: SearchBoxRenderer<SearchBoxQueryHookWidgetParams>= ({ currentRefinement, refine, widgetParams }) => {
  widgetParams.container
  widgetParams.queryHook
  widgetParams.placeholder
  refine(currentRefinement);
};

const searchBoxQueryHook: CreateSearchBoxQueryHook = ({ container, ...rest }) => {
  const createWidget = connectSearchBox<SearchBoxQueryHookWidgetParams>(
    renderSearchBoxWithQueryHook,
    () => {}
  );

  return createWidget({
    ...rest,
    container,
    queryHook(next, search) {
      search(next);
    },
  });
};

searchBoxQueryHook({
  container: '#searchBox',
  placeholder: 'Apple, iPhone, ...',
});

/**
 * Create widget
 */

import { poweredBy } from './poweredBy';

poweredBy({
  container: '#searchBox',
  url: '/hello',
});

/**
 * Create widget with partial widget params
 */

import { poweredByWithURL } from './poweredByWithPartialApplication';

poweredByWithURL({
  container: '#searchBox',
});

/**
 * Custom with default
 */

import { connectPoweredBy, PoweredByConnectorParams } from './connectPoweredBy';

const customPoweredBy = connectPoweredBy(
  ({ url, widgetParams }) => {
    // widgetParams.container;
    url;
    widgetParams.url;
  },
  () => {}
);

customPoweredBy({
  url: '/instantsearch'
});

/**
 * Custom with custom widget params
 */

interface CustomPoweredByWidgetParams extends PoweredByConnectorParams {
  container: string;
}

const customPoweredByWithContainer = connectPoweredBy<CustomPoweredByWidgetParams>(
  ({ url, widgetParams }) => {
    widgetParams.container;
    widgetParams.url;
    url;
  },
  () => {}
);

customPoweredByWithContainer({
  container: '#searchBox',
  url: '/instantsearch',
});
