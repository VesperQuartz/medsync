import { StyleProp, Text, TextStyle } from 'react-native';

import { useGetStaff, useGetUser } from '~/hooks/api';

export const NameText = ({
  id,
  className,
  style,
}: {
  id: number;
  className?: string;
  style?: StyleProp<TextStyle>;
}) => {
  const user = useGetUser(id);
  return (
    <Text style={style} className={className}>
      {user.data?.name}
    </Text>
  );
};

export const SpecialityText = ({
  id,
  className,
  style,
}: {
  id: number;
  className?: string;
  style?: StyleProp<TextStyle>;
}) => {
  const user = useGetStaff(id);
  console.log(user.data, 'user');
  return (
    <Text style={style} className={className}>
      {user.data?.staff.speciality}
    </Text>
  );
};
