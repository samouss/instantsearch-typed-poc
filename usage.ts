/**
 * Create widget
 */

import { searchBox } from './src'
import { poweredBy } from './src';

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

import { searchBoxQueryHook } from './src';
import { poweredByWithURL } from './src';

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

import { connectPoweredBy, PoweredByConnectorParams } from './src';
import { connectSearchBox, SearchBoxConnectorParams } from './src';

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
