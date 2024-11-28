// src/types/react-simple-maps.d.ts
declare module "react-simple-maps" {
    import { ComponentType } from "react";
    
    export interface GeographyProps {
      key: string;
      geography: any;  // Define this with a more specific type if necessary
      fill?: string;
      stroke?: string;
      strokeWidth?: number;
    }
  
    export interface GeographiesProps {
      geography: string;
      children: (props: { geographies: any[] }) => JSX.Element;  // Geographies should return a function with 'geographies' prop
    }
  
    export const ComposableMap: ComponentType<any>;
    export const Geographies: ComponentType<GeographiesProps>;
    export const Geography: ComponentType<GeographyProps>;
    export const Marker: ComponentType<any>;
  }
  