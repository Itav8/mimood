import type { ComponentStyleConfig } from "@chakra-ui/theme";

// You can also use the more specific type for
// a single part component: ComponentSingleStyleConfig
export const ButtonTheme: ComponentStyleConfig = {

  // The styles all button have in common
  baseStyle: {
    fontWeight: "bold",
    textTransform: "uppercase",
    borderRadius: "base", // <-- border radius is same for all variants and sizes
  },
  // Two variants: outline and solid
  variants: {
    outline: {
      border: "2px solid",
      borderColor: "orange.700",
      color: "orange.700",
      _hover: {
        transform: "scale(1.05, 1.05)",
        backgroundColor: "orange.50",
      },
    },
    solid: {
      bg: "orange.700",
      color: "white",
      _hover: {
        transform: "scale(1.05, 1.05)",
        backgroundColor: "orange.600",
      },
    },
  },
  // The default size and variant values
  defaultProps: {
    size: "md",
    variant: "outline",
  },
};
