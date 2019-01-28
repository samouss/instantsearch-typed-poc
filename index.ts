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

type Renderer<T extends RenderOptions> = (renderOptions: T) => void;

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
 * ConnectPoweredBy
 */

interface PoweredByRenderOptions<T> extends RenderOptions<T> {
  url: string;
}

interface PoweredByConnectorParams extends WidgetConnectorParams {
  url: string;
}

// How to infer this from the connector? We can use namespace?
type PoweredByRenderer<T> = Renderer<PoweredByRenderOptions<PoweredByConnectorParams & T>>

interface ConnectPoweredBy {
  // How to make this generic?
  <T>(render: PoweredByRenderer<T>, unmount: () => void): CreateWidget<PoweredByConnectorParams & T>;
}

interface CustomPoweredByWidgetParams extends PoweredByConnectorParams {
  container: string;
}

const connectPoweredBy: ConnectPoweredBy = (render, dispose) => {
  return (widgetParams) => {
    // widgetParams.container
    widgetParams.url

    return ({
      render() {
        render({
          url: '/hello',
          instantSearchInstance: null,
          widgetParams,
        })
      },
  })};
}

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

type CreatePoweredBy = CreateWidget<PoweredByWidgetParams>;

interface PoweredByWidgetParams extends PoweredByConnectorParams {
  container: string | HTMLElement;
}

const renderPoweredBy: PoweredByRenderer<PoweredByWidgetParams>= ({ url, widgetParams }) => {
  widgetParams.container
  widgetParams.url
  url
};

const poweredBy: CreatePoweredBy = ({ container, url, ...rest }) => {
  const createWidget = connectPoweredBy<PoweredByWidgetParams>(
    renderPoweredBy,
    () => {}
  );

  return createWidget({
    ...rest,
    container,
    url,
  });
};

poweredBy({
  container: '#searchBox',
  url: '/instantseach',
});

/**
 * Create widget with partial widget params
 */

type CreatePoweredByWithURL = CreateWidget<PoweredByWithURLWidgetParams>;

interface PoweredByWithURLWidgetParams {
  container: string | HTMLElement;
}

const renderPoweredByWithURL: PoweredByRenderer<PoweredByWithURLWidgetParams>= ({ url, widgetParams }) => {
  widgetParams.container
  widgetParams.url
  url
};

const poweredByWithURL: CreatePoweredByWithURL = ({ container, ...rest }) => {
  const createWidget = connectPoweredBy<PoweredByWithURLWidgetParams>(
    renderPoweredBy,
    () => {}
  );

  return createWidget({
    ...rest,
    url: '/instantsearch',
    container,
  });
};

poweredByWithURL({
  container: '#searchBox',
});
