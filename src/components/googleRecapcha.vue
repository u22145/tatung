<template>
    
  <div id="recaptcha" class="g-recaptcha" data-size="invisible">
   
  </div>
</template>

<script>
  export default
  {    
      name: 'googleRecapcha',
      data(){
          return {
              sitekey: '6Lf9jIQjAAAAANbPE3CijitgGR3zP-EFf8tKBUW_'              
          }
      },
      methods: {
          execute () {                
              window.grecaptcha.execute();
          },
          reset () {
              window.grecaptcha.reset();
          },
          render () {
              var me = this;
              if (window.grecaptcha) {
                  this.widgetId = window.grecaptcha.render('recaptcha', {
                  sitekey: this.sitekey,
                  size: 'invisible',
                      callback: (token) => {
                          me.$emit('getGoogle',token),
                          this.reset();
                      }
                  });
              }
          }
      },
      mounted(){
          this.render();
      }
  }
</script>
<style lang="scss">
.grecaptcha-logo,.g-recaptcha {
    opacity: 0;
    position: absolute;
    right: 0;
    bottom: 0;
  }
</style>