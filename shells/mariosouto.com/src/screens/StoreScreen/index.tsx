import { Box, Text } from "@src/components";
import { MainHeader } from "@src/patterns/MainHeader";
import { products } from "./products";

export default function StoreScreen() {
  return (
    <Box styleSheet={{
      flex: 1,
    }}>
      <MainHeader />
      
      <Box>
        {products.map((product) => (
          <Box key={product.url}>
            <Text>{product.name}</Text>
            <Text>{product.description}</Text>
            <Text>{product.url}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
