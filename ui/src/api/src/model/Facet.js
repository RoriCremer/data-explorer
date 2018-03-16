/**
 * Data Explorer Service
 * API Service that reads from Elasticsearch.
 *
 * OpenAPI spec version: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 */


import ApiClient from '../ApiClient';
import FacetValue from './FacetValue';





/**
* The Facet model module.
* @module model/Facet
* @version 0.0.1
*/
export default class Facet {
    /**
    * Constructs a new <code>Facet</code>.
    * A facet. For example, the Gender facet would include the facet name \&quot;Gender\&quot;, as well as counts for all possible values. 
    * @alias module:model/Facet
    * @class
    */

    constructor() {
        

        
        

        

        
    }

    /**
    * Constructs a <code>Facet</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/Facet} obj Optional instance to populate.
    * @return {module:model/Facet} The populated <code>Facet</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Facet();

            
            
            

            if (data.hasOwnProperty('facet_name')) {
                obj['facet_name'] = ApiClient.convertToType(data['facet_name'], 'String');
            }
            if (data.hasOwnProperty('values')) {
                obj['values'] = ApiClient.convertToType(data['values'], [FacetValue]);
            }
        }
        return obj;
    }

    /**
    * @member {String} facet_name
    */
    facet_name = undefined;
    /**
    * @member {Array.<module:model/FacetValue>} values
    */
    values = undefined;








}

