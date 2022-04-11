import React from 'react';
import { Touchable } from 'react-native';
import { Box, Text, TouchableArea } from 'skynexui';

export default function HomeScreen() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [appState, setAppState] = React.useState({
    play: false,
    scrollPosition: 0,
  });
  const PLAY_TIME_IN_SECONDS = 1 * 100;
  const data = {
    title: 'O que é ReactJS?',
    content: 'ReactJS é uma biblioteca JavaScript de código aberto para criar interfaces de usuário. Ele é utilizado para construir interfaces de usuário através de componentes.',
  };
  const config = {
    background: { color: 'white', backgroundColor: 'black' },
    scrollSpeed: 13, // 0-100
    fontSize: 10,
    marginHorizontal: 10, // 0-10
    mirror: false,
    loop: false,
  }

  function whilePlay() {
    const MAX_SCROLL_HEIGHT = containerRef.current.scrollHeight;
    setAppState((currentState) => {
      const {
        scrollPosition: currrentScrollPosition,
        play: currentPlayState,
        ...rest
      } = currentState;
      
      
      if(currentPlayState) setTimeout(whilePlay, PLAY_TIME_IN_SECONDS);

      if(currrentScrollPosition < MAX_SCROLL_HEIGHT) {
        return {
          play: currentPlayState,
          scrollPosition: currrentScrollPosition + config.scrollSpeed,
          ...rest
        };
      }
      return {
        play: currentPlayState,
        scrollPosition: MAX_SCROLL_HEIGHT,
        ...rest
      }; 
    });
  }

  React.useEffect(() => {
    if(appState.play) {
      const interval = setTimeout(whilePlay, PLAY_TIME_IN_SECONDS);
      return () => clearTimeout(interval);
    }
  }, [appState.play]);
  

  React.useEffect(() => {
    containerRef.current.scrollTop = appState.scrollPosition;
  }, [appState.scrollPosition]);


  function togglePlayState() {
    setAppState((currentState) => {
      const {
        play: currentPlayState,
        ...rest
      } = currentState;
      return {
        play: !currentPlayState,
        ...rest
      };
    });
  }

  function resetState() {
    setAppState((currentState) => {
      return {
        ...currentState,
        play: false,
        scrollPosition: 0,
      };
    });
  }
  
  return (
    <Box
      ref={containerRef}
      styleSheet={{
        scrollBehavior: 'smooth',
        flex: 1,
        textAlign: 'justify',
        backgroundColor: config.background.backgroundColor,
        position: 'relative',
        height: '100vh',
        overflow: 'scroll',
      }}
    >
      <Text styleSheet={{
        color: config.background.color,
        fontSize: `${config.fontSize}vw`,
        padding: `${config.marginHorizontal}vw`,
      }}>
        {data.title}
        <Box tag="span" styleSheet={{ marginBottom: `${config.fontSize}vw` }} />
        {data.content}
      </Text>

      <Box
        styleSheet={{
          width: '100%',
          height: '1px',
          backgroundColor: 'red',
          position: 'fixed',
          top: '45%'
        }} 
      />
      <Box
        styleSheet={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderTop: `1px solid ${config.background.color}`,
          backgroundColor: config.background.backgroundColor,
          position: 'fixed',
          bottom: '0',
        }}
      >
        <TouchableArea
          onPress={() => togglePlayState()}
        >
          <Text
            styleSheet={{
              color: config.background.color,
            }}
          >
            Toggle Play
          </Text>
        </TouchableArea>

        <TouchableArea
          onPress={() => resetState()}
        >
          <Text
            styleSheet={{
              color: config.background.color,
            }}
          >
            Reset
          </Text>
        </TouchableArea>
      </Box>
    </Box>
  )
}
