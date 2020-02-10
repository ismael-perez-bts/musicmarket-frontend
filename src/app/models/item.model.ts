export interface Item {
  /**
   * Item ID
   */
  id: number;

  /**
   * Item title / main label
   */
  title: string;

  /**
   * Item description
   */
  description: string;

  /**
   * Item condition. 1 is new. 2 - 5 are used from best to worse condition.
   */
  condition: number;

  /**
   * Item price
   */
  price: number;

  /**
   * Indicates if it is for sale or not
   */
  state: number;

  /**
   * Date item was created
   */
  date_created: string;

  /**
   * Date item was edited/updated
   */
  date_updated: string;

  /**
   * Item state location id
   */
  state_id: number;

  /**
   * State name
   */
  state_name: string;

  /**
   * City id
   */
  city_id: number;

  /**
   * City name
   */
  city_name: string;

  /**
   * Item image url
   */
  image_url: string;

  /**
   * User name of item owner.
   */
  user_name: string;

  /**
   * User profile image of item owner.
   */
  user_profile_image: string;

  /**
   * User ID
   */
  user_id: number;

  /**
   * User uid
   */
  user_uid: string;

  /**
   * Category label.
   */
  category_label: string;

  /**
   *  Category ID.
   */
  category_id: number;
}
