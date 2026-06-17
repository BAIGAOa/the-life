import { Box, useWindowSize } from "ink";
import React from "react";


export default function KeyboardSet(){
  const {rows} = useWindowSize()

  return(
    <Box borderStyle='double' borderColor='white' height={rows} width='100%'>
      
    </Box>
  )
}
