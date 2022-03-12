import moment from 'moment';
import 'moment/locale/ko';

export default function getDateTimeDiff(dateTimeString: Date): string {
  return moment(
    moment(dateTimeString).format('YYYYMMDDHHmmss'),
    'YYYYMMDDHHmmss'
  ).fromNow();
}
