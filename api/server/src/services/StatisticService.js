import database from '../models';

class StatisticService {
  static async writeDownNewLanguagesAnswersStatistic(data) {
    return database.LanguagesAnswersStatistic.create(data)
  }

  static async clearLanguagesAnswersStatisticTable() {
    return database.LanguagesAnswersStatistic.destroy({ truncate: true });
  }
}

export default StatisticService;
