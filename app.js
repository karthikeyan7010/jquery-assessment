require ({
   //You can configure loading modules from the lib directory
   baseUrl: 'lib',
   
   paths: {
      //mapping of package
      dojo: 'http://sfoster.dojotoolkit.org/dojobox/1.7-branch/dojo'
   }
   
}, [
      //modules which we are using here
      'dojo/dom'
   ], function(dom) { 
   
      //using the 'byId' method from dom module
      var mydojo = dom.byId('dojo_val')
      mydojo.innerHTML = "The text is displaying via dojo/dom";   
   }
);