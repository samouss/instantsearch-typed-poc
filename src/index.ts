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
 * Create widget
 */

import { searchBox } from './searchBox'
import { poweredBy } from './poweredBy';

searchBox({
  container: '#searchBox',
  placeholder: 'Apple, iPhone, ...',
  queryHook(next, search) {
    search(next);
  },
});

poweredBy({
  container: '#searchBox',
  url: '/hello',
});

/**
 * Create widget with partial widget params
 */

import { searchBoxQueryHook } from './searchBoxWithPartialApplication';
import { poweredByWithURL } from './poweredByWithPartialApplication';

searchBoxQueryHook({
  container: '#searchBox',
  placeholder: 'Apple, iPhone, ...',
});

poweredByWithURL({
  container: '#searchBox',
});

/**
 * Custom with default
 */

import { connectPoweredBy, PoweredByConnectorParams } from './connectPoweredBy';
import { connectSearchBox, SearchBoxConnectorParams } from './connectSearchBox';

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

interface CustomSearchBoxWidgetParams extends SearchBoxConnectorParams {
  container: string;
}

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
