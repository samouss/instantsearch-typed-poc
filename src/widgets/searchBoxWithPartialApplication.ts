import { connectSearchBox, SearchBoxRenderer } from '../connectors';
import { CreateWidget } from '../types'

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

export const searchBoxQueryHook: CreateWidget<SearchBoxQueryHookWidgetParams> = ({ container, ...rest }) => {
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
