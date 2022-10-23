import React from 'react';
import { Touchable } from 'react-native';
import { Box, Text, TouchableArea } from 'skynexui';

const db = {
  title: 'O que é ReactJS?',
  content: 'ReactJS é uma biblioteca JavaScript de código aberto para criar interfaces de usuário. Ele é utilizado para construir interfaces de usuário através de componentes.',
}

function useTeleprompter({
  containerRef,
}) {
  const PLAY_TIME_IN_SECONDS = 1 * 100;
  const [title, setTitle] = React.useState(db.title);
  const [content, setContent] = React.useState(db.content);
  const [appState, setAppState] = React.useState({
    play: false,
    reset: false,
    scrollPosition: 0,
    background: { color: 'white', backgroundColor: 'black' },
    scrollSpeed: 20, // 0-100
    fontSize: 10,
    marginHorizontal: 10, // 0-10
    mirror: false,
    loop: false,
  });

  function whilePlay() {
    const CONTAINER_PADDING_BOTTOM = getComputedStyle(containerRef.current).paddingBottom.replace('px', '');
    const MAX_SCROLL_HEIGHT = containerRef.current.scrollHeight - Number(CONTAINER_PADDING_BOTTOM);
    console.log();
    setAppState((currentState) => {
      const {
        scrollPosition: currrentScrollPosition,
        play: currentPlayState,
        ...rest
      } = currentState;

      if (currentPlayState) setTimeout(whilePlay, PLAY_TIME_IN_SECONDS);

      if (currrentScrollPosition < MAX_SCROLL_HEIGHT) {
        return {
          play: currentPlayState,
          scrollPosition: currrentScrollPosition + appState.scrollSpeed,
          ...rest,
          reset: false,
        };
      }

      return {
        play: false,
        scrollPosition: MAX_SCROLL_HEIGHT,
        ...rest,
        reset: false,
      };
    });
  }

  React.useEffect(() => {
    if (appState.play) {
      const interval = setTimeout(whilePlay, PLAY_TIME_IN_SECONDS);
      return () => clearTimeout(interval);
    }
  }, [appState.play]);


  React.useEffect(() => {
    if(appState.play || appState.reset) containerRef.current.scrollTop = appState.scrollPosition;
  }, [appState.scrollPosition]);



  function togglePlayState() {
    setAppState((currentState) => {
      const {
        play: currentPlayState,
        ...rest
      } = currentState;
      return {
        ...rest,
        play: !currentPlayState,
        reset: false,
      };
    });
  }



  function resetState() {
    setAppState((currentState) => {
      return {
        ...currentState,
        play: false,
        reset: true,
        scrollPosition: 0,
      };
    });
  }


  return {
    appState,
    title,
    setTitle,
    content,
    setContent,
    togglePlayState,
    resetState,
  };
}

export default function HomeScreen() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const teleprompter = useTeleprompter({
    containerRef,
  });


  return (
    <Box
      ref={containerRef}
      styleSheet={{
        scrollBehavior: teleprompter.appState.play ? 'smooth' : 'initial',
        flex: 1,
        textAlign: 'justify',
        backgroundColor: teleprompter.appState.background.backgroundColor,
        position: 'relative',
        height: '100vh',
        paddingBottom: '60vh',
      }}
      >
      <Text styleSheet={{
        paddingTop: '45vh',
        color: teleprompter.appState.background.color,
        paddingHorizontal: `${teleprompter.appState.marginHorizontal}vw`,
        fontSize: `${teleprompter.appState.fontSize}vw`,
      }}>
        {teleprompter.title}
        <Box tag="span" styleSheet={{ marginBottom: `${teleprompter.appState.fontSize}vw` }} />
        {teleprompter.content}
      </Text>

      <Box
        styleSheet={{
          width: '100%',
          height: '1px',
          backgroundColor: 'red',
          position: 'fixed',
          top: '45vh'
        }}
      />
      <Box
        styleSheet={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderTop: `1px solid ${teleprompter.appState.background.color}`,
          backgroundColor: teleprompter.appState.background.backgroundColor,
          position: 'fixed',
          bottom: '0',
        }}
      >
        <TouchableArea
          onPress={() => teleprompter.togglePlayState()}
        >
          <Text
            styleSheet={{
              color: teleprompter.appState.background.color,
            }}
          >
            Toggle Play
          </Text>
        </TouchableArea>

        <TouchableArea
          onPress={() => teleprompter.resetState()}
        >
          <Text
            styleSheet={{
              color: teleprompter.appState.background.color,
            }}
          >
            Reset
          </Text>
        </TouchableArea>
      </Box>
    </Box>
  )
}
