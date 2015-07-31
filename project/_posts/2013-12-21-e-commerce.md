---
layout: project
permalink: project/ecommerce/

display_id: nemo

name: Multitenancy e-commerce platform
short_desc: Project for my summer internship at GoDaddy.com, LLC
lang: [rails, ruby, javascript, html5, mysql]
description: |
    I have interned in the Presence and Commerce department at GoDaddy.com, LLC, and this is the project I have participated.
---
During my intern at [GoDaddy.com](http://www.godaddy.com), I have worked with the e-commerce team in the Presence and Commerce department. My main job is working on the <span id="nemo_research_click" style="color:#268ED4;">research</span> and <span id="nemo_implementation_click" style="color:#268ED4;">implementation</span> of GoDaddy's e-commerce platform.

<h3 id="nemo_research">Research</h3>
I have participated in the evaluation of current major open source e-commerce frameworks. The Frameworks I have evaluated are [Spree](http://spreecommerce.com) with [Rails](http://rubyonrails.org), [Oscar](http://tangentlabs.github.io/django-oscar/) with [Django](https://www.djangoproject.com), and [BroadLeaf](http://www.broadleafcommerce.org) with [Spring](http://projects.spring.io/spring-framework/).

Along with my colleagues, we have evaluated frameworks in the following criteria.

- License type.
- Supported features.
- Compatibility with desired HLA.
- Code style and design (OO design, performant, extensible, etc).
- Mature and stable (documentation, test cases, development process, etc).
- Security.
- Community support and reputation.
- Current usage of the frameworks.

After the evaluation, we have generated reports to discuss the situation of each e-commerce platforms, which then helped the decision making of future implementation and development of our e-commerce product.


<h3 id="nemo_implementation">Implementation</h3>
After the evaluation of e-commerce frameworks, I have participated in the development of our e-commerce product. Below are some major parts I have contributed:

####Database Routing
Our e-commerce product is a multi-tenancy SaaS application. Due to the design and legacy code issues, our approach in database design is to create **one database per tenant**; also, in order to make the architecture more scalable, we want to distribute tenant databased in different physical database servers. Thus, we have to route each incoming request to correct tenant database.

My primary contribution here was to update an database routing library to fit our needs as described above. The approach is to insert a [middleware](http://guides.rubyonrails.org/rails_on_rack.html) to connect active record to the correct database before the request hitting the rails stack. Thus, an abstraction could be created to let module out the database routing functionality from the e-commerce app features.


####Thread Safety of AR
While working on the database routing stuff, we have found one problem with ActiveRecord 3.2.14 -- that in the case of multiple threads, database connection will be override in our approach. After doing extensive research on this problem, I have identified the problem is from the ConnectionPool class of ActiveRecord. With minimum monkey patching on the ConnectionPool class, this problem is solved.

Even though this override is tested and reviewed, we have chose not to use it since we have decided to use [Passenger](https://www.phusionpassenger.com), a single thread app server. This design selection could solve the multi-threads issue completely without modification on the rails framework.

####Single Sign-on System
I have also participated in the implementation of the Single Sign-on System for our e-commerce platform to integrate with the company's internal services. With the single sign-on system, customer could login once and access the e-commerce product from their central control panel.

####Evaluate and modification of existing extensions
In addition to the work above, I have helped in the evaluation and modification of various extensions of the [Spree](http://spreecommerce.com) platform. Those extensions involves real-time shipping quote, invoice generation, and many other features required by a e-commerce platform.

<script type="text/javascript">
$('#nemo_research_click').click(function () {
	$('html, body').animate({
		scrollTop: $("#nemo_research").offset().top
	}, 500);
});

$('#nemo_implementation_click').click(function () {
	$('html, body').animate({
		scrollTop: $("#nemo_implementation").offset().top
	}, 500);
});

$("#nemo_research_click, #nemo_implementation_click").hover(
  function () {
  	$(this).css({
	  	"text-decoration" : "underline",
	  	"cursor" : "pointer"
  	});
  },
  function () {
  	$(this).css({
	  	"text-decoration" : "none"
  	});
  }
);
</script>
