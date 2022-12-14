/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {FlatList, Image, ImageBackground, View} from 'react-native';
import styled from 'styled-components/native';
import {colors, Margin, NText, SRowContainer} from '../../components';
import {useRootContext} from '../../RootProvider';
import EmotionModal from './EmotionModal';

interface Props {
  step: number;
  textNum: number; // κΈμμ
  keywordArr: string[];
  emotionBlock: string[];
  setEmotionBlock: (v: string[]) => void;
}

const KeywordBlock = styled.TouchableOpacity`
  background-color: ${props => props.backgroundColor};
  border-radius: 6px;
  height: 50px;
  margin-left: 30px;
  margin-right: 30px;
`;

export default function DiaryStep3({
  step,
  keywordArr,
  emotionBlock,
  setEmotionBlock,
}: Props) {
  const rootContext = useRootContext();
  const [isVisibleEmotionModal, setIsVisibleEmotionModal] =
    useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>();

  const renderItem = ({item, index}: {item: string; index: number}) => {
    const selectkeyword = item === selectedItem;
    const selecteKeywordNEmoiton = emotionBlock.length > 2 && selectkeyword;
    return (
      <KeywordBlock
        backgroundColor={
          emotionBlock.length > 2 && selectkeyword
            ? colors.primary
            : colors.primaryLight
        }
        onPress={() => {
          if (selecteKeywordNEmoiton) {
            setEmotionBlock([]);
          }
          setSelectedItem(item);
          setIsVisibleEmotionModal(true);
        }}>
        <SRowContainer>
          <NText.SB15
            text={item}
            color={
              selecteKeywordNEmoiton ? colors.white : colors.textUnavailableGray
            }
            style={{
              alignSelf: 'flex-start',
              marginRight: 100,
              paddingVertical: 15,
              paddingHorizontal: 19,
            }}
          />
          {emotionBlock.length > 0 && selectkeyword && (
            <>
              <ImageBackground
                source={require('../../assets/image/emotion_color_bg.png')}
                style={{
                  width: 52,
                  height: 52,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: -2,
                  right: 115,
                }}>
                <NText.SM13
                  text={emotionBlock[0]}
                  color={colors.textUnavailableGray}
                />
              </ImageBackground>
              <Margin.CustomWidth margin={6} />
              <ImageBackground
                source={require('../../assets/image/emotion_color_bg.png')}
                style={{
                  width: 52,
                  height: 52,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: -2,
                  right: 57,
                }}>
                <NText.SM13
                  text={emotionBlock[1]}
                  color={colors.textUnavailableGray}
                />
              </ImageBackground>
              <Margin.CustomWidth margin={6} />
              <ImageBackground
                source={require('../../assets/image/emotion_color_bg.png')}
                style={{
                  width: 52,
                  height: 52,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: -2,
                  right: 0,
                }}>
                <NText.SM13
                  text={emotionBlock[2]}
                  color={colors.textUnavailableGray}
                />
              </ImageBackground>
            </>
          )}
        </SRowContainer>
      </KeywordBlock>
    );
  };

  return (
    <>
      <SRowContainer justifyContent="center" alignItems="center">
        <NText.SB12 text={rootContext.user.username} color={colors.primary} />
        <NText.SM12
          text={'λ! μ€λ νλ£¨ μ΄λ€ κ°μ λ€μ λκΌλμ§ λμλ³Ό'}
          color={colors.textUnavailableGray}
        />
      </SRowContainer>
      <Margin._3 />
      <NText.SM12
        text={'μ°¨λ‘μμ. μΌκΈ° ν€μλμ κ΄λ ¨λ κ°μ λ€μ μ νν΄ μ£ΌμΈμ!'}
        color={colors.textUnavailableGray}
        style={{textAlign: 'center'}}
      />

      <Margin._40 />
      <View
        style={{
          backgroundColor: colors.primaryLight,
          width: 69,
          height: 23,
          borderRadius: 7,
          padding: 5,
          alignItems: 'center',
          alignSelf: 'flex-end',
          marginRight: 35,
        }}>
        <NText.B10 text="κ°μ μ΄ νλ!" color={colors.primary} />
        <Image
          source={require('../../assets/image/pros_4.png')}
          style={{
            width: 45,
            height: 25,
          }}
        />
      </View>
      <Margin._15 />
      <SRowContainer alignItems="center">
        <Image
          source={require('../../assets/image/line.png')}
          style={{width: 320, height: 1.5, marginLeft: 30}}
        />
        <Image
          source={require('../../assets/image/circle.png')}
          style={{width: 12, height: 12, marginRight: 29}}
        />
      </SRowContainer>
      <SRowContainer marginLeft={54} alignSelf="flex-end" marginRight="75">
        <NText.B10 text={`${step - 1}`} color={colors.primary} />
        <NText.B10 text={'/3'} color={colors.lightgray} />
      </SRowContainer>
      <Margin._23 />
      <NText.SM12
        text="ν€μλ λΈλ‘μ ν΄λ¦­νλ©΄, 20κ°μ§ κ°μ μ΄κ° λμμ!"
        color={colors.textUnavailableGray}
        style={{textAlign: 'center'}}
      />

      <FlatList
        // data={keywordArr.slice(0, 5)}
        data={keywordArr}
        renderItem={renderItem}
        ListHeaderComponent={() => <Margin._14 />}
        ItemSeparatorComponent={() => <Margin._14 />}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />

      {/* κ°μ  λͺ¨λ¬ */}
      <EmotionModal
        isVisibleEmotionModal={isVisibleEmotionModal}
        setIsVisibleEmotionModal={setIsVisibleEmotionModal}
        keywordArr={keywordArr}
        emotionBlock={emotionBlock}
        setEmotionBlock={setEmotionBlock}
      />
    </>
  );
}
