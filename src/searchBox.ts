import { connectSearchBox, SearchBoxConnectorParams, SearchBoxRenderer } from './connectSearchBox'
import { CreateWidget } from './index'

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

export const searchBox: CreateWidget<SearchBoxWidgetParams> = ({ container, queryHook, ...rest }) => {
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
