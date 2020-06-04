import isEmpty from 'lodash/isEmpty';
import forEach from 'lodash/forEach';
// import cron from 'cron';

import LanguageService from '../../services/LanguageService';
import StatisticService from '../../services/StatisticService';
import TagService from '../../services/TagService';
import TagStatisticService from '../../services/TagStatisticService';

async function generateStatistic() {
  const allLanguagesAnswersStatistic = await LanguageService.getAllLanguagesCorrectAnswersStatistic();
  console.info('Cron generate languages statistic!!!');

  if (!isEmpty(allLanguagesAnswersStatistic)) {
    await StatisticService.clearLanguagesAnswersStatisticTable();
    forEach(allLanguagesAnswersStatistic, (item) => {
      StatisticService.writeDownNewLanguagesAnswersStatistic(item)
    })
  }
  const allTagsStatistic =
    await TagService.getAllTagsNumberOfCorrectAnswersAverageTimesPercentilesStatistic();
  if (allTagsStatistic) {
     await TagStatisticService.clearTagsStatistic();
     console.info('Cron tag statistic!!!', allTagsStatistic);
     forEach(allTagsStatistic, (item) => {
       TagStatisticService.writeDownTagStatistic(item)
     })
  }
}

export default generateStatistic;
