import database from '../models';

class TagStatisticService {
  static async writeDownTagStatistic(data) {
    return database.TagStatistic.create(data);
  }

  static async clearTagsStatistic() {
    return database.TagStatistic.destroy({truncate: true});
  }

  static async getAllTagsStatistic() {
    return database.TagStatistic.findAll();
  }

}

export default TagStatisticService;
