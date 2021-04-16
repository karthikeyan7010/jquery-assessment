var StoreApp = {
	Collection : {},
	Model : {},
	View : {},
	Router: {}
};


StoreApp.View.DetailView = Backbone.View.extend({
	// Get the markup from this id for the views template
	el: '#detail',
	template : $('#tmp-details').html(),

	initialize: function() { },

	// Event list
	events: {
		'click button#back':'back',
		'click button#cart':'addToCart'
	},

	// Render the view with the template
	render: function () {
		this.$el.html( _.template( this.template, this.model.toJSON() ) );
		return this;
	},

	setModel: function (model) {
		this.model = model;
		this.render();
	},

	// Called on view click
	addToCart : function() {
		// Add the model to the Cart view
		StoreApp.cart.add( this.model );
	},

	back: function(){
		window.router.navigate('#', true);
	}
});

// Our Model type
StoreApp.Model.Picture = Backbone.Model.extend({

	defaults : {
		'price' : 0,
		'image': '',
		'thumb': '',
		'total': 0,
		'quantity': 0
	},

	// Set and return the total for said model ( price x quantity )
	total : function() {

		var total = this.get('price') * this.get('quantity');
		this.set('total', total);
		return total;

	},

	// Increase or decrease the quantity
	quantity : function( type ) {
		var thisQuantity = this.get('quantity');
		this.set('quantity', (type === 'increase' ? ++thisQuantity : --thisQuantity) );
	}

});

// Define our Collection
StoreApp.Collection.Pictures = Backbone.Collection.extend({

	models: StoreApp.Model.Picture,

	// Returns the total amount for all items, using model.total()
	subtotal : function() {

		var total = 0;

		this.each(function( model ){
			total += model.total();
		});

		return total.toFixed(2);
	}
});

// View for individual item in the Item list
StoreApp.View.Picture = Backbone.View.extend({

	// this view is a li element
	tagName: 'li',
	className: 'col-md-4',

	// Get the markup from this id for the views template
	template : $('#tmp-pictureItem').html(),

	// Event list
	events: {
		'click button#moreInfo': 'navigate',
		'click button#addCart' : 'addToCart'
	},

	navigate : function(e){
		e.preventDefault();
		window.router.navigate('artist/' + this.model.id, true);
	},

	initialize: function() {
		// On init, render
		this.render();
	},

	render: function() {
		// Render the view with the template
		this.$el.html( _.template( this.template, this.model.toJSON() ) );
		return this;
	},

	// Called on view click
	addToCart : function() {
		// Add the model to the Cart view
		StoreApp.cart.add(new StoreApp.Model.Picture(appView.getCollectionItem(this.model.id -1)));
	}
});


// View for the List of individual items
StoreApp.View.PictureListView = Backbone.View.extend({

	el: '#default-item-list',

	initialize: function() {
        // wait to the "reset" trigger
		this.collection.on("reset", this.render, this);
	},

	render: function() {
		this.addAll();
	},
	addOne: function (thePicture) {
		var pictureView = new StoreApp.View.Picture({ model: thePicture });
		this.$el.append( pictureView.render().el );
	},
	addAll: function () {
		this.collection.forEach(this.addOne, this);
	}

});



// Individual View for Item inside Shopping Cart
StoreApp.View.ShoppingCartItemView = Backbone.View.extend({

	// This view is a tr element
	tagName: 'tr',
	template : $('#tmp-shoppingCartItem').html(),

	events : {
		'click .name' : 'remove',
		'click .quantity' : 'manageQuantity'
	},

	initialize : function() {

		this.render();

		// If this models contents change, we re-render
		this.model.on('change', function(){
			this.render();
		}, this);

	},

	render : function() {

		// Render this view and return its context
		this.$el.html( _.template( this.template, this.model.toJSON() ));
		return this;

	},

	manageQuantity : function( event ) {

		// Get quantity type from data-type in the element
		var type = $(event.target).data('type');

		// If this event is to decrease, and the current quantity is 1
		if( this.model.get('quantity') === 0 && type === 'decrease' ) {

			this.remove();

		} else {

			// enot fully implemented
			this.model.quantity(type);
		}
	},

	remove : function(){

		// Fade out item out from the shopping cart list
		this.$el.fadeOut(500, function(){

			// Remove it from the DOM on completetion
			$(this).remove();

		});

		// Remove the model for this view from the Shopping Cart Items collection
		StoreApp.cartItems.remove( this.model );
	}
	

});



// View for the Shopping Cart, container for individual Shopping Cart Item Views
StoreApp.View.ShoppingCart = Backbone.View.extend({

	el: '#shopping-list',

	// Some other elements to cache
	total : $('#total'),
	cartTotal : $('#basket'),

	initialize : function(){

		// make a reference to the collection this view dances with
		this.collection = StoreApp.cartItems;

		// execute default message for the shopping cart on init
		this.defaultMessage();

		// Listen for events ( add, remove or a change in quantity ) in the collection
		this.collection.on('add remove', function( item ){

			// Update the main total based on the new data
			this.updateTotal();

			// If there is no items in the Cart
			if( this.collection.length === 0 ) {
				this.defaultMessage();
			}

			// Pass in this views context
		}, this);

	},

	defaultMessage : function() {
		$('#showForm').hide();
		// Give the view a class of empty, and inject new default content
		this.$el.addClass('empty').html('<tr><td colspan="4"><i class="fa fa-shopping-cart"></i> Cart is empty</td></tr>');

	},

	add : function( item ) {

		// Remove .empty class from the view
		this.$el.removeClass('empty');
		$('#showForm').fadeIn();

		// Increase the quantity by 1
		item.quantity('increase');

		// Add the passed item model to the Cart collection
		this.collection.add( item );

		// Render the view
		this.render();

	},

	// Update the totals in the cart
	updateTotal : function() {

		// This is the var for the counter at the top of the page
		var cartTotal = 0;

		// Loop through this collection and addup the number of items
		this.collection.each(function( item ){
			cartTotal += item.get('quantity');
		});

		// Inject these totals
		this.cartTotal.html( cartTotal );
		this.total.html( this.collection.subtotal() );

	},

	render : function(){

		// Empty the view
		this.$el.html('');

		// Loop through the collection
		this.collection.each(function( item ){

			// Render each item model into this List view
			var newItem = new StoreApp.View.ShoppingCartItemView({ model : item });
			this.$el.append( newItem.render().el );

			// Pass this list views context
		}, this);

	}

});


// Default Items for our item List.
var items = [
	{ id:'1',title: 'oneplus6', thumb:'img/oneplus6.jpg',image:'img/oneplus6.jpg',price: 49000, photographer:'oneplus6',tag:'sku:567898',description:'The OnePlus 6 brings a new glass back with your choice of three different finishes, the Snapdragon 845 processor, and a bigger screen with a notch. It takes on today biggest flagships, some of which cost over twice as much. Performance is great, and the display will keep most people happy. The phone looks and feels good too, and you can definitely show it off. The cameras are slightly underwhelming, and some people will miss the creative options that other manufacturers offer. Battery life was good enough to get us through a full day with some power left over. You do not get all the bells and whistles of a top-end phone, but the OnePlus 6 has more than enough to keep most people happy.' },
	{ id:'2',title: 'oneplus7t', thumb:'img/oneplus7t.jpg',image:'img/oneplus7t.jpg',price: 52000, photographer:'oneplus7t',tag:'sku:121756',description:'The device is powered by Qualcomm Snapdragon 855 Plus chipset, which is flagship SoC and handles operations well. It has a Kryo 485 octa-core processor setup (a 2.96GHz Single core, 2.42GHz Tri core, 1.8GHz Quad-core). The Adreno 640 GU handles the graphical requirement of the device while 8GB RAM looks after gaming and multitasking with ease' },
	{ id:'3',title: 'oneplusnord', thumb:'img/oneplusnord.jpeg',image:'img/oneplusnord.jpeg', price: 39000, photographer:'oneplusnord',tag:'sku:678964',description:'The OnePlus Nord is a new budget offering from OnePlus, which manages to deliver a similar Android experience as the OnePlus 8, but at a more affordable price. OnePlus has kept all the staples such as the AMOLED display, Warp Charge fast charging, and a big battery in the Nord. However, it has made some cuts when it comes to the SoC and the build quality' },
	{ id:'4',title: 'oneplus8t', thumb:'img/onrplus8t.jpg',image:'img/onrplus8t.jpg', price: 55000, photographer:'oneplus8t',tag:'sku:701077',description:'OnePlus 8T smartphone was launched on 14th October 2020. The phone comes with a 6.55-inch touchscreen display with a resolution of 1080x2400 pixels at a pixel density of 402 pixels per inch (ppi) and an aspect ratio of 20:9. It comes with 12GB of RAM. The OnePlus 8T runs Android 11 and is powered by a 4500mAh non-removable battery' },
	{ id:'5',title: 'oneplus9pro', thumb:'img/onrplus9pro.png',image:'img/onrplus9pro.png', price : 60000, photographer:'oneplus9pro',tag:'sku:955177',description:'OnePlus 9 and OnePlus 9R will go on their first sale today in India at 12pm (noon) for Amazon Prime members and Red Cable Club members. Regular customers can purchase the phones from April 15.' }
	
	
];


/* THIS IS THE MAIN APP VIEW, everithing start here */

StoreApp.View.AppView = Backbone.View.extend({
	initialize : function(){

		// define detail View, set to 1
		StoreApp.detailView = new StoreApp.View.DetailView();

		// define collections pictures && cartItems
		StoreApp.pictures = new StoreApp.Collection.Pictures();
		StoreApp.cartItems = new StoreApp.Collection.Pictures();

		// define our shopping cart
		StoreApp.cart = new StoreApp.View.ShoppingCart();

		StoreApp.pictures.add( new StoreApp.Model.Picture( StoreApp.pictures ) );

		// define the clickable objects
		StoreApp.pictureList = new StoreApp.View.PictureListView({ collection: StoreApp.pictures });

		this.fetchCollections();


		// Example of an external listener,
		// Execute when a model is added to the cart Items collection
		StoreApp.cartItems.on('add', function( item ){

			// Make sure this models quantity is set to 1 on adding
			item.set('quantity',1);

		});
	},
	// add all items in the json to the collection
	fetchCollections: function () {
		// here goes the ajax call, in this example it's a fake json
		StoreApp.pictures.reset(items);
	},
	// get one item in the json
	getCollectionItem: function(id){
		return items[id];
	}
});

StoreApp.Router = Backbone.Router.extend({
	routes: {
		"": "index",
		"#": "index",
		"artist/:id": "artist"
	},
	index: function(){
		// hide the detail view & show the list
		$('#default-item-list').show();
		$('#detail').hide();
	},

	artist: function (id) {
        // hide the list and show the detail view
		$('#default-item-list').hide();

		StoreApp.detailView.setModel(new StoreApp.Model.Picture(appView.getCollectionItem( id-1 )));
		$('#detail').show();
	}
});

$(function () {

	window.appView = new StoreApp.View.AppView({el:document});
	window.router = new StoreApp.Router;
	Backbone.history.start();


	// delegate calls to data-toggle="lightbox"
	$(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
		event.preventDefault();
		return $(this).ekkoLightbox({
			always_show_close: true
		});
	});


	// check mail
	
	// add link in a new tab/window
	addTargetBlank = function(){
		$("a[rel=external], a[href^='http:']:not([href*='" + window.location.host + "']), a[href^='https:']:not([href*='" + window.location.host + "'])").each(function(){
			$(this).attr("target", "_blank");
		});
	};
		
	addTargetBlank();
});
