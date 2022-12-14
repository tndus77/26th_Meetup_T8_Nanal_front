/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {useRootContext} from '../../RootProvider';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {colors, Margin, NText} from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NotRecordModal from './NotRecordModal';
import YearNMonthModal from './YearNMonthModal';
import {getCalendarColumns} from '../../components/calendar';
import dayjs from 'dayjs';
import DiaryEditModal from './DiaryEditModal';

export default function HomeMain({route, navigation}: any) {
  // state
  const rootContext = useRootContext();
  let record: boolean;
  if (route.params) {
    try {
      record = route.params;
    } catch (error) {
      console.log(error);
    }
  }
  const {
    now,
    setNow,
    year,
    setYear,
    month,
    setMonth,
    day,
    setDay,
    filledColumns,
    thisWeekStartDay,
  } = getCalendarColumns();

  const [isYearNMonthModalVisible, setIsYearNMonthModalVisible] =
    useState<boolean>(false);
  const [isNotRecordModalVisible, setIsNotRecordModalVisible] =
    useState<boolean>(false);
  const [isVisibleDiaryEditModal, setIsVisibleDiaryEditModal] =
    useState<boolean>(false);

  // vals
  const DayArr = ['SUN', 'MON', 'TUE', 'WED', 'THR', 'FRI', 'SAT'];

  // func
  const onBackdropPress = () => {
    setIsYearNMonthModalVisible(false);
  };
  const onPressPrevYear = () => {
    setYear(year - 1);
    setNow(now.subtract(1, 'year'));
  };
  const onPressNextYear = () => {
    setYear(year + 1);
    setNow(now.add(1, 'year'));
  };
  const onPressNotRecordModal = () => {
    setIsNotRecordModalVisible(true);
  };
  const onPressYearNMonthModal = () => {
    setIsYearNMonthModalVisible(true);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 25,
          paddingTop: 25,
        }}>
        <NText.SB23
          text={`${rootContext.user.username}?????? ??????`}
          color={'#2C2C2C'}
        />
        <Margin.CustomWidth margin={70} />
        <Image
          source={require('../../assets/image/retro_complete.png')}
          style={{width: 27, height: 9}}
          resizeMode="contain"
        />
        <Margin.CustomWidth margin={10} />
        <NText.SB15 text="X 19" color="#5E5E5E" />
        <Margin.CustomWidth margin={20} />
        <TouchableOpacity onPress={() => navigation.navigate('Notice')}>
          <Ionicons
            name="notifications-outline"
            size={22}
            color={colors.textUnavailableGray}
          />
        </TouchableOpacity>
      </View>
      <Margin._15 />

      {/* ?????? */}
      <TouchableOpacity
        onPress={onPressYearNMonthModal}
        style={{
          borderRadius: 7,
          width: 147,
          height: 37,
          borderColor: colors.lineGray,
          borderWidth: 1,
          paddingHorizontal: 16,
          paddingVertical: 9,
          marginLeft: 30,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <NText.SB15 text={`${year}??? ${month}???`} color={'#5E5E5E'} />
        <Margin.CustomWidth margin={17} />
        <Ionicons
          name="chevron-down-outline"
          size={22}
          color={colors.textUnavailableGray}
        />
      </TouchableOpacity>

      {/* ????????? */}
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          marginHorizontal: 5,
          paddingVertical: 55,
        }}>
        {/* ????????? ??? */}
        <View
          style={{
            padding: 8,
            backgroundColor: colors.primaryLight,
            width: 88,
            height: 30,
            borderRadius: 6,
            position: 'absolute',
            top: 0,
            right: 28,
          }}>
          <TouchableOpacity onPress={() => setIsVisibleDiaryEditModal(true)}>
            <NText.B10 text="????????? ????????? ???" color={colors.primary} />
          </TouchableOpacity>
        </View>
        <Image
          source={require('../../assets/image/pros_4.png')}
          style={{
            width: 45,
            height: 25,
            position: 'absolute',
            top: 30,
            right: 28,
          }}
        />
        <View style={{flex: 1}}>
          {/* ?????? */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              borderTopWidth: 0.5,
              borderLeftWidth: 0.5,
              marginHorizontal: 25,
              paddingVertical: 12,
              borderColor: '#EFEFEF',
              borderRightWidth: 0.5,
            }}>
            {DayArr.map((v, i) => (
              <NText.B10
                key={'dayColumn' + i}
                text={v}
                color={
                  i === DayArr.length - 1
                    ? colors.primary
                    : colors.textUnavailableGray
                }
              />
            ))}
          </View>

          {/* ?????? */}
          <View
            style={{
              borderColor: '#EFEFEF',
              alignItems: 'center',
              flexDirection: 'row',
              marginHorizontal: 25,
              width: '96%',
              flexWrap: 'wrap',
            }}>
            {filledColumns.map((day, index) => {
              const date = day.get('date');
              const thisMonth = dayjs().add(1, 'month').get('month');
              // ?????????
              const thisWeek =
                month === thisMonth &&
                (date === thisWeekStartDay ||
                  date === thisWeekStartDay + 1 ||
                  date === thisWeekStartDay + 2 ||
                  date === thisWeekStartDay + 3 ||
                  date === thisWeekStartDay + 4 ||
                  date === thisWeekStartDay + 5 ||
                  date === thisWeekStartDay + 6);
              // ????????? && ?????? ?????? ??? TODO ?????? ?????? ??? ????????????
              // const thisWeekNnotRecord = thisWeek && !record;
              const thisWeekNnotRecord = thisWeek && date === 26;

              return (
                <TouchableOpacity
                  onPress={() => {
                    console.log(date);
                    setDay(date);
                  }}
                  key={'dateColumn' + index}
                  style={{
                    height: 92,
                    width: '13%',
                    borderTopWidth: 0.5,
                    borderRightWidth: 0.5,
                    borderBottomWidth: 0.5,
                    borderLeftWidth: 0.5,
                    borderColor: '#EFEFEF',
                    paddingTop: 9,
                    paddingLeft: 6,
                    backgroundColor:
                      thisWeek && !thisWeekNnotRecord
                        ? 'rgba(255, 245, 229, 0.7)'
                        : thisWeek && thisWeekNnotRecord
                        ? 'rgba(255, 165, 22, 0.36)'
                        : colors.white,
                  }}>
                  <NText.B12
                    text={day.get('date')}
                    color={
                      thisWeek ? colors.textMiddle : colors.textUnavailableGray
                    }
                  />

                  {/* ?????? ???????????? */}
                  {/* {fixIndex && (
                      <Image
                        source={require('../../assets/image/calendar_bg.png')}
                        style={{width: 310, height: 48}}
                      />
                    )} */}

                  {/* ?????? ?????? ??? + ?????? */}
                  {thisWeekNnotRecord && (
                    <TouchableOpacity
                      onPress={onPressNotRecordModal}
                      style={{
                        height: 39,
                        width: 37,
                        marginTop: 2,
                        backgroundColor: colors.white,
                        borderTopRightRadius: 6,
                        borderBottomLeftRadius: 6,
                        borderBottomRightRadius: 6,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Ionicons
                        name="add-outline"
                        color={colors.primary}
                        size={30}
                      />
                    </TouchableOpacity>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* ??? & ??? ?????? */}
      <YearNMonthModal
        isVisible={isYearNMonthModalVisible}
        onBackdropPress={onBackdropPress}
        onPressNextYear={onPressNextYear}
        onPressPrevYear={onPressPrevYear}
        year={year}
        month={month}
        setMonth={setMonth}
        setNow={setNow}
        now={now}
      />
      {/* ?????? ?????? ??? ?????? */}
      <NotRecordModal
        isVisible={isNotRecordModalVisible}
        onBackdropPress={() => setIsNotRecordModalVisible(false)}
        year={year}
        month={month}
        day={day}
      />
      {/* ?????? ?????? ?????? TODO record??? ?????? ???(??????) ???????????? */}
      <DiaryEditModal
        year={year}
        month={month}
        day={day}
        isVisibleDiaryEditModal={isVisibleDiaryEditModal}
        onBackdropPress={() => setIsVisibleDiaryEditModal(false)}
        emotionBlock={['??????', '??????', '??????']}
        keywordArr={['?????????1', '?????????2', '?????????3']}
      />
    </SafeAreaView>
  );
}
