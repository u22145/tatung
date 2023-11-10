let Myplugin = {};
Myplugin.install = function (Vue, options) {

    // gaTag 標籤
    Vue.prototype.$gtag_trackEvent = function (category, event, label) {
        // this.$ga.event(label,action, value)
        this.$gtag.event(event, {
            'event_category':category,
            'event_label': label,
          })
 
    }
    // lineTag 標籤
    Vue.prototype.$line_trackEvent = function (type) {
        // this.$ga.event(label,action, value)
        _lt('send', 'cv', { type: type,},['4913fc1a-b782-44cb-b4c2-f6740ce1bd41']);
 
    }
}

export default Myplugin