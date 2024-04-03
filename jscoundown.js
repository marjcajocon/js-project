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
       var dv = parseInt(ms / value);
       var rem = ms % value; // remainder
       ms = rem;
       label.push([label_key[i], dv]);
       i++;
   }
   
   return {positive:  is_ps, data: label};
   
}


var ret = dateCountDown('2023-06-04 22:12:01', '2024-04-03 20:00:00');
console.log(ret);
