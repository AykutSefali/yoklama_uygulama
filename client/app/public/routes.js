import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

FlowRouter.route('/', {
  name: 'public.home',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'add' });
  }
});

  FlowRouter.route('/ogrenci-ekle', {
    name: 'public.ekle',
    action: function (params, queryParams) {
      this.render('publicLayoutDefault', { page: 'addogrenci' });
    }
  });
 
