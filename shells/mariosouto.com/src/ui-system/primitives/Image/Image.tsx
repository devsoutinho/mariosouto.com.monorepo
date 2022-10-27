import BaseComponent from "@src/ui-system/theme/BaseComponent";
import { StyleSheet } from "@src/ui-system/theme/StyleSheet";


interface ImageProps {
  src?: string;
  alt: string;
  styleSheet?: StyleSheet;
}
export function Image({ src, alt, ...props }: ImageProps) {
  return (
    <BaseComponent as="img" src={src} alt={alt} {...props} />
  )
}
