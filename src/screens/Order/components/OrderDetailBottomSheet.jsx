import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {themeColors} from '../../../constants/colors';
import {Bike, Cooking, Orders, Phone, TickTwo} from '../../../assets/images';
import {Fonts} from '../../../constants/fonts';
import {faker} from '@faker-js/faker';
import {thousandSeparator} from '../../../utils';

const OrderDetailBottomSheet = ({total}) => {
  // eslint-disable-next-line no-unused-vars
  const [currentTime, setCurrentTime] = useState(new Date());
  const [deliveryTime, setDeliveryTime] = useState(new Date());
  const [step, setStep] = useState(0);
  const [iconColors, setIconColors] = useState([
    themeColors.GRAY,
    themeColors.GRAY,
    themeColors.GRAY,
    themeColors.GRAY,
  ]);
  const [personDetails, setPersonDetails] = useState({});

  console.log('personDetails', personDetails);

  useEffect(() => {
    setPersonDetails({
      name: faker.person.fullName(),
      phone: faker.phone.number({style: 'international'}),
      orderID: faker.finance.accountNumber(5),
      image: faker.image.avatar(),
    });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setStep(prevStep => {
        if (prevStep < 3) {
          return prevStep + 1;
        }
        return 0;
      });
    }, 5000); // 15 seconds

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const newDeliveryTime = new Date(currentTime.getTime() + 45 * 60 * 1000);
    setDeliveryTime(newDeliveryTime);
  }, [currentTime]);

  useEffect(() => {
    const updatedIconColors = [];
    for (let i = 0; i < 4; i++) {
      if (i <= step) {
        updatedIconColors.push(themeColors.PRIMARY); // orange
      } else {
        updatedIconColors.push(themeColors.GRAY); // gray
      }
    }
    setIconColors(updatedIconColors);
  }, [step]);

  const images = [Orders, Cooking, Bike, TickTwo];

  return (
    <View style={styles.container}>
      <View style={styles.separator} />

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <View style={styles.profileInfo}>
            {personDetails?.image && (
              <Image
                source={{uri: personDetails.image}}
                style={styles.profileImage}
              />
            )}
            <View>
              <Text style={styles.nameText}>{personDetails?.name}</Text>
              <Text style={styles.orderIdText}>
                Order ID: {personDetails?.orderID}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`tel:${personDetails?.phone}`);
            }}
            style={styles.phoneIcon}>
            <Image source={Phone} style={styles.phoneImage} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomContent}>
        <Text style={styles.title}>Your Delivery Time</Text>
        <View style={styles.timeContainer}>
          <Text style={styles.timeLabel}>Estimated Time</Text>
          <Text style={styles.timeValue}>
            {currentTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}{' '}
            -{' '}
            {deliveryTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}
          </Text>
        </View>

        <View style={styles.imageContainer}>
          {images.map((image, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Text
                style={[
                  styles.dash,
                  {color: iconColors[index]},
                  index === 0 ? styles.hidden : {},
                ]}>
                &#8212;&#8212;&#8212;&#8212;&#8212;
              </Text>
              <Image
                source={image}
                style={[styles.image, {tintColor: iconColors[index]}]}
              />
            </View>
          ))}
        </View>

        <View style={styles.orderTotalContainer}>
          <Text style={styles.label}>Order Total</Text>
          <Text style={styles.value}>Rs. {thousandSeparator(total)}</Text>
        </View>
      </View>
    </View>
  );
};

export default OrderDetailBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.BLACK,
  },
  separator: {
    backgroundColor: themeColors.GRAY,
    width: 50,
    height: 5,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 15,
  },
  infoCard: {
    marginVertical: 20,
    backgroundColor: themeColors.WHITE,
    marginHorizontal: 15,
    borderRadius: 100,
    padding: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileImage: {
    width: 43,
    height: 43,
    borderRadius: 50,
    resizeMode: 'contain',
  },
  nameText: {
    fontSize: 14,
    fontFamily: Fonts.SEMIBOLD,
    color: themeColors.BLACK,
  },
  orderIdText: {
    fontSize: 12,
    fontFamily: Fonts.REGULAR,
    color: themeColors.GRAY,
  },
  phoneIcon: {
    alignItems: 'flex-end',
  },
  phoneImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  bottomContent: {
    backgroundColor: themeColors.WHITE,
    height: '100%',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  imageContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  image: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  dash: {
    display: 'flex',
  },
  hidden: {
    display: 'none',
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.SEMIBOLD,
    color: themeColors.BLACK,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    gap: 5,
  },
  timeLabel: {
    fontSize: 12,
    fontFamily: Fonts.REGULAR,
    color: themeColors.GRAY,
  },
  timeValue: {
    fontSize: 12,
    fontFamily: Fonts.REGULAR,
    color: themeColors.GRAY,
  },
  orderTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.SEMIBOLD,
    color: themeColors.BLACK,
  },
  value: {
    fontSize: 14,
    fontFamily: Fonts.REGULAR,
    color: themeColors.GRAY,
  },
});
