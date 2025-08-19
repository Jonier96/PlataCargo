declare module "react-simple-maps" {
  import * as React from "react";

  export interface Geography {
    rsmKey: string;
    properties: Record<string, any>;
  }

  export interface GeographiesChildrenArgs {
    geographies: Geography[];
  }

  export interface GeographiesProps {
    geography: string | object;
    children: (args: GeographiesChildrenArgs) => React.ReactNode;
  }

  export interface ComposableMapProps extends React.SVGProps<SVGSVGElement> {
    projection?: string;
    projectionConfig?: Record<string, any>;
    width?: number;
    height?: number;
  }

  export const ComposableMap: React.FC<ComposableMapProps>;
  export const Geographies: React.FC<GeographiesProps>;
  export const Geography: React.FC<{ geography: Geography }>;
}
