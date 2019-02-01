import { RenderOptions, Renderer, CreateWidget, Refinable } from './index'

export interface SearchBoxRenderOptions<T> extends RenderOptions<T>, Refinable<string> {
  currentRefinement: string;
}

export interface SearchBoxConnectorParams {
  queryHook: (value: string, search: (value: string) => void) => void;
}

// How to infer this from the connector? We can use namespace?
export type SearchBoxRenderer<T> = Renderer<SearchBoxRenderOptions<SearchBoxConnectorParams & T>>
export type CreateSearchBox<T> = CreateWidget<SearchBoxConnectorParams & T>;

interface ConnectSearchBox {
  // How to make this generic?
  <T>(render: SearchBoxRenderer<T>, unmount: () => void): CreateSearchBox<T>
}

export const connectSearchBox: ConnectSearchBox = (render, dispose) => {
  return (widgetParams) => {
    // widgetParams.container
    widgetParams.queryHook

    return ({
      render({ helper }) {
        render({
          currentRefinement: 'Hello',
          refine: (value) => helper.setQuery(value).search(),
          instantSearchInstance: null,
          widgetParams,
        })
      },
  })};
}
