function dateCountDown(date_adv, cur_date) {
  var date_adv = new Date(date_adv);
  var cur_date = new Date(cur_date);
  var ms = date_adv - cur_date;
  
  var is_ps = ms > 0;

 
  var label_key   = ['Y',         'M',       'd',      'h',     'm',   's'];
  var label_value = [31104000000, 2592000000, 86400000, 3600000, 60000, 1000];
  var ln = label_key.length;
  
  var label = [];
  
  var i = 0; 
  while(i < ln) {
      var value = label_value[i];
      var dv = ms / value;
      /* Fixed for large number  problem in javascript  */
      if (dv > 0 && ms < value) {
        dv = 0;
      }
      /* End Fixed for large number */

      var rem = ms % value; // remainder
      ms = rem;

      label.push([label_key[i], parseInt(dv)]);
      i++;
  }
  
  return {positive:  is_ps, data: label};
  
}
