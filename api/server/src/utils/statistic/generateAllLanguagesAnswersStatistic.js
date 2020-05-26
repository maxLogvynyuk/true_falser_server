import isEmpty from 'lodash/isEmpty';
import forEach from 'lodash/forEach';
// import cron from 'cron';

import LanguageService from '../../services/LanguageService';
import StatisticService from '../../services/StatisticService';

async function generateAllLanguagesAnswersStatistic() {
  const allLanguagesAnswersStatistic = await LanguageService.getAllLanguagesCorrectAnswersStatistic();
  console.info('Cron generateAllLanguagesAnswersStatistic!!!');
  if (!isEmpty(allLanguagesAnswersStatistic)) {
    await StatisticService.clearLanguagesAnswersStatisticTable();
    forEach(allLanguagesAnswersStatistic, (item) => {
      StatisticService.writeDownNewLanguagesAnswersStatistic(item)
    })
  }
}

export default generateAllLanguagesAnswersStatistic;
