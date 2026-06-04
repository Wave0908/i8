function AllReady() {
	var mstform = Ext.getCmp('EmployeeCertEdit');
  	if(!Ext.isEmpty(mstform)) {
      mstform.on('dataready',function(){
	var PhidType = mstform.getItem('PhidType').getValue();
  
      mstform.getItem('SendDt').userSetMustInput(true);
	  mstform.getItem('user_ygzsjglx').setVisible(false);
      mstform.getItem('PhidLevel').userSetMustInput(false);
       if(PhidType =='224200413000012'){
         mstform.getItem('CertOrg').userSetMustInput(true);
       }
	   console.log(PhidType)
		          if(PhidType =='224200413000008'){
		               mstform.getItem('CertOrg').userSetMustInput(true);
		          	   mstform.getItem('user_ygzsjglx').setVisible(true);
		          	   mstform.getItem('user_ygzsjglx').userSetMustInput(true);
		          	   mstform.getItem('CertOrg').userSetReadOnly(true);
		          	   mstform.getItem('PhidLevel').userSetMustInput(false);
                    	mstform.getItem('user_sfjxjy').userSetMustInput(true);
                       mstform.getItem('user_sfjxjy').setVisible(true);
                       mstform.getItem('user_jxjysj').setVisible(true);
		          			
		       
		          }else{
		          		   	mstform.getItem('PhidLevel').userSetMustInput(true);
                            mstform.getItem('user_sfjxjy').setVisible(false);
                            mstform.getItem('user_jxjysj').setVisible(false);
		          }
		     });
	
	   
	   
		  mstform.getItem('user_sfjxjy').addListener('change', function(obj) {
		    var    user_sfjxjy =  mstform.getItem('user_sfjxjy').getValue()
            if(user_sfjxjy=='1'){
                  mstform.getItem('user_jxjysj').userSetMustInput(false);
                  mstform.getItem('user_jxjysj').setVisible(false);
               }else{
                  mstform.getItem('user_jxjysj').userSetMustInput(true);
                  mstform.getItem('user_jxjysj').setVisible(true);
               }
		  })
		  
        mstform.getItem('user_ygzsjglx').addListener('helpselected', function(obj) {
		    mstform.getItem('CertOrg').setValue(obj.data.c_name)
		  })
		  mstform.getItem('PhidName').addListener('helpselected', function(obj) {
			  console.log(obj.data)
			   console.log(obj.data)
			if(obj.data.PhId == '224200413000025' || obj.data.PhId == '224200413000027' ){
				mstform.getItem('PhidMajor').userSetMustInput(true);
			}else{
				mstform.getItem('PhidMajor').userSetMustInput(false);
			}
			
		  })
		  mstform.getItem('PhidName').addListener('helpselected', function(obj) {
			  mstform.getItem('PhidLevel').userSetMustInput(false);
		  })
		  
    }
  
  
//八大员开始
     
    if(mstform.getItem('PhidType').getValue()=='224200413000008'){
          mstform.getItem('user_ygzsjglx').userSetMustInput(true);
          mstform.getItem('CertOrg').userSetMustInput(false);
      
          mstform.getItem('user_ygzsjglx').on('beforetriggerclick', function() { 
            if(mstform.getItem('SendDt').getValue() ==null) {
                Ext.Msg.alert('提示', '请先选择发证日期');
                return false;
                
        }
        }); 
        var PhidType=mstform.getItem('PhidType').getValue();
        mstform.getItem('SendDt').addListener('change', function () {
            var SendDt = mstform.getItem('SendDt').getValue();
            if(mstform.getItem('user_jxjysj').getValue()==null && PhidType=='224200413000008'){
                mstform.getItem('EffectBdt').setValue(SendDt);
            }
      }); 
      }
       else {
              mstform.getItem('user_ygzsjglx').userSetMustInput(false);
              mstform.getItem('CertOrg').userSetMustInput(true);
      }
  
 	
      if(mstform.getItem('PhidType').getValue()=='224200413000008'){
        mstform.getItem('user_ygzsjglx').addListener('helpselected', function () {
            var SendDt = mstform.getItem('SendDt').getValue();
            var SendDt_date =new Date(SendDt)
            var PhidType=mstform.getItem('PhidType').getValue();
            var user_jxjysj= mstform.getItem('user_jxjysj').getValue();
            var user_ygzsjglx= mstform.getItem('user_ygzsjglx').getValue();
            var year3 = SendDt_date.getFullYear()+3;
            var year2 = SendDt_date.getFullYear()+2;
            var month = SendDt_date.getMonth()+ 1; 
            var day = SendDt_date.getDate()-1;
            var month1 = month < 10 ? '0' + month : month;
            var day1 = day < 10 ? '0' + day : day;
            var test1='-';
            var SendDt_date_js3 = "".concat(year3).concat(test1).concat(month1).concat(test1).concat(day1);
            var SendDt_date_js2 = "".concat(year2).concat(test1).concat(month1).concat(test1).concat(day1);
            console.log( user_jxjysj);
            console.log(SendDt_date_js3);
            console.log(user_ygzsjglx);
            if(user_jxjysj==null && user_ygzsjglx=='569000000002256'&& PhidType=='224200413000008'){
                          	
                	mstform.getItem('EffectEdt').setValue(SendDt_date_js3);
            }
            else if(user_jxjysj==null && user_ygzsjglx !='569000000002256'&& user_ygzsjglx !='569000000002191'&& PhidType=='224200413000008'){
              		console.log(SendDt_date_js2);
                	mstform.getItem('EffectEdt').setValue(SendDt_date_js2);
            }	else {
		
    }
        }); 
    }
    if(mstform.getItem('PhidType').getValue()=='224200413000008'){
 		 mstform.getItem('SendDt').addListener('change', function () {
                var PhidType=mstform.getItem('PhidType').getValue()
                 var SendDt = mstform.getItem('SendDt').getValue();
                 var SendDt_date =new Date(SendDt);//发证日期
                 var user_jxjysj= mstform.getItem('user_jxjysj').getValue();
                 var user_ygzsjglx= mstform.getItem('user_ygzsjglx').getValue();
                 var year3 = SendDt_date.getFullYear()+3;//发证日期
                 var year2 = SendDt_date.getFullYear()+2;//发证日期
                 var month = SendDt_date.getMonth()+ 1; //发证日期
                 var day = SendDt_date.getDate()-1;//发证日期
                 var month1 = month < 10 ? '0' + month : month;//发证日期
                 var day1 = day < 10 ? '0' + day : day;//发证日期
                 var test1='-';
                 var SendDt_date_js3 = "".concat(year3).concat(test1).concat(month1).concat(test1).concat(day1);//发证日期
                 var SendDt_date_js2 = "".concat(year2).concat(test1).concat(month1).concat(test1).concat(day1);//发证日期

                if(user_ygzsjglx==null&& PhidType=='224200413000008'){
                
                    if(user_jxjysj==null && user_ygzsjglx=='569000000002256')
                     mstform.getItem('EffectEdt').setValue(SendDt_date_js3);
                 }
                    else if(user_jxjysj==null && user_ygzsjglx !='569000000002256'&& user_ygzsjglx !='569000000002191'){
                     mstform.getItem('EffectEdt').setValue(SendDt_date_js2);
                 }
                 
         }); 
        
        }
    if(mstform.getItem('PhidType').getValue()=='224200413000008'){
      mstform.getItem('user_jxjysj').addListener('change', function () {
                var PhidType=mstform.getItem('PhidType').getValue()
                var SendDt = mstform.getItem('SendDt').getValue();
                var SendDt_date =new Date(SendDt);//发证日期
                var user_jxjysj= mstform.getItem('user_jxjysj').getValue();
                var user_ygzsjglx= mstform.getItem('user_ygzsjglx').getValue();
                var month = SendDt_date.getMonth()+ 1; //发证日期
                var day = SendDt_date.getDate()-1;//发证日期
                var month1 = month < 10 ? '0' + month : month;//发证日期
                var day1 = day < 10 ? '0' + day : day;//发证日期
                var test1='-';

                var user_jxjysj_date =new Date(user_jxjysj);
                var user_jxjysj_year1 = user_jxjysj_date.getFullYear()+1;
                var user_jxjysj_year2 = user_jxjysj_date.getFullYear()+2;
                var user_jxjysj_month = user_jxjysj_date.getMonth()+ 1; 
                var user_jxjysj_day = user_jxjysj_date.getDate()-1;
                var user_jxjysj_js1 = "".concat(user_jxjysj_year1).concat(test1).concat(month1).concat(test1).concat(day1);//发证日期
                var user_jxjysj_js2 = "".concat(user_jxjysj_year2).concat(test1).concat(month1).concat(test1).concat(day1);//发证日期
                console.log(user_jxjysj_date);
                console.log(user_jxjysj_js2);
                if(SendDt!='' && user_ygzsjglx !='569000000002256'&& user_ygzsjglx !='569000000002191'&& PhidType=='224200413000008'){
                    if(user_jxjysj_month>month){
                        mstform.getItem('EffectEdt').setValue(user_jxjysj_js2);
                    }
                    else if (user_jxjysj_month<month){
                        mstform.getItem('EffectEdt').setValue(user_jxjysj_js1);
                    }
                    else if (user_jxjysj_month=month){
                        if(user_jxjysj_day>day){
                            mstform.getItem('EffectEdt').setValue(user_jxjysj_js2);
                        }
                        else if (user_jxjysj_day<day){
                            mstform.getItem('EffectEdt').setValue(user_jxjysj_js1);
                        }
                        else {
                            mstform.getItem('EffectEdt').setValue(user_jxjysj_js1);
                        }
                    }

                }


        });
    }
  
  
  
  
  
      
  
}
