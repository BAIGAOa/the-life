import React from 'react';
import { Text } from 'ink';
import { useTheme } from '@baigao_h/ink-kit';

const LINES = [
  '  ████████╗██╗  ██╗███████╗    ██╗     ██╗███████╗███████╗',
  '  ╚══██╔══╝██║  ██║██╔════╝    ██║     ██║██╔════╝██╔════╝',
  '     ██║   ███████║█████╗      ██║     ██║█████╗  █████╗  ',
  '     ██║   ██╔══██║██╔══╝      ██║     ██║██╔══╝  ██╔══╝  ',
  '     ██║   ██║  ██║███████╗    ███████╗██║██║     ███████╗',
  '     ╚═╝   ╚═╝  ╚═╝╚══════╝    ╚══════╝╚═╝╚═╝     ╚══════╝',
];

export function Logo() {
  const { color } = useTheme();
  const titleColor = color('titleColor') ?? 'magentaBright';

  return (
    <>
      {LINES.map((line, i) => (
        <Text key={i} color={titleColor} bold>
          {line}
        </Text>
      ))}
    </>
  );
}
