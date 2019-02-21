# AEM CMS Project - News and Happenings.

This is a hypothetical project and does not relates to any clients or companies so ever. This is the draft implementation for the News section of the website. This project best works on AEM 6.4 and uses the latest feature pack (6.4.3).
Some of the outputs might not work well in older version of internet browser.

This project was created from the Granite Maven Archetype - v17 
```$xslt
mvn org.apache.maven.plugins:maven-archetype-plugin:2.4:generate \
-DarchetypeGroupId=com.adobe.granite.archetypes \
-DarchetypeArtifactId=aem-project-archetype \
-DarchetypeVersion=17  \
-DarchetypeCatalog=https://repo.adobe.com/nexus/content/groups/public/ 
```

Please refer to the "newsComponent" under ui.apps project module.

Please refer to the "How to build" section for the project setup.

## Requirements
1. Allow an author to publish a list on news
2. Allow the user to pick a picture from the DAM or upload a new one
3. Allow the author to add a title and a shot description (limited to 140 character)
4. Allow the user to add a link to content in the JCR or an external link
5. Compliant with WCAG

## Assumptions
* It is assumed that the copy/content authors of this application has relevant access and permissions to Create, Read, Update,  Delete (CRUD).
"user" and "author" are the same.
* Also they have Publish/Activate permission so that they can activate the content via the AEM Sites.
* All component development is done using the local permission with admin user
* The "news" content is going to be created using the static page template, though content producers  or marketing team can take a call with the product owners whether to choose a "Editable page template" or "Static page template".
* News is going some what structured, and might not change as frequently as it happens to other media related "happening" pages.
* This project comes with default components constructed via the maven archetype. They are not part of this requirement (but merrily accompanied).

## Thinking on the above points of requirement
* The first  requirement is already satisfied by the out-of-the-box feature in AEM 6.4 Sites (or siteadmin in classic UI)
* The second requirement is also satisfied by the inbuilt feature of AEM for digital asset upload or use.
* The third requirement is a custom feature and is developed in the "newsComponent" located under the ui.apps module.
* The forth point is also an inbuilt feature in Rich Text Editor (RTE) component. This is as per the industry best practices.
* The fifth requirement is a challenging one, and Adobe accepts that not all Level AAA Success Criteria could be satisfied.
Further reading - https://helpex.adobe.com/experience-manager/6-4/managing/using/web-accessibility.html
This should be considered as limitations.
* Again to comply with WCAG 2.0, all images uploaded or used via AEM DAM will ensure the author or the copy writers to key in the "Alternative Text". This way the less privileged users of internet can better connect with this component's output.
* Beyond this the images are not set for background images since it is not as per the recommendation from W3C for WCAG 2.0 compatibility.

## Best practices
* Use out-of-the-box components as much as possible.
* Since the author input validation is not complex, drive it via the authoring validation.
* For future proofing, the client-libs used for this group of components are not commonly located, so that the BAU or the team which is going to maintain know where to look for.
* Do not set any images as page background images.

## Notes to consider prior to build and test
* The project's content path is "/content/assignment/" and so please make sure contents created are placed under this path.
* Also if the page is not configured (though not required in the dev setup) with DTM's local contexthub, you might see browser's JavaScript console exception (but not to worry).
* Also I have constructed some sample contents, which you can locate it under /content/assignment/
* mvn clean test might not work. This is how it is straight from the granite maven archetype (will try to fix when time permits).

## Modules

The main parts of the template are:

* core: Java bundle containing all core functionality like OSGi services, listeners or schedulers, as well as component-related Java code such as servlets or request filters.
* ui.apps: contains the /apps (and /etc) parts of the project, ie JS&CSS clientlibs, components, templates, runmode specific configs as well as Hobbes-tests
* ui.content: contains sample content using the components from the ui.apps
* ui.tests: Java bundle containing JUnit tests that are executed server-side. This bundle is not to be deployed onto production.
* ui.launcher: contains glue code that deploys the ui.tests bundle (and dependent bundles) to the server and triggers the remote JUnit execution

## How to build
Checkout the "dev" branch from this github repo...
```$xslt
git clone https://github.com/esaiventhan/aem.git
cd aem
git checkout dev
```


To build all the modules run in the project root directory the following command with Maven 3:

    mvn clean install

If you have a running AEM instance you can build and package the whole project and deploy into AEM with  

    mvn clean install -PautoInstallPackage
    
Or to deploy it to a publish instance, run

    mvn clean install -PautoInstallPackagePublish
    
Or alternatively

    mvn clean install -PautoInstallPackage -Daem.port=4503

Or to deploy only the bundle to the author, run

    mvn clean install -PautoInstallBundle

## Testing

    mvn clean test // Does not works straight from Granite Maven Archetype. So do not try to run the test.

There are three levels of testing contained in the project:

* unit test in core: this show-cases classic unit testing of the code contained in the bundle. To test, execute:

    mvn clean test

* server-side integration tests: this allows to run unit-like tests in the AEM-environment, ie on the AEM server. To test, execute:

    mvn clean verify -PintegrationTests

* client-side Hobbes.js tests: JavaScript-based browser-side tests that verify browser-side behavior. To test:

    in the browser, open the page in 'Developer mode', open the left panel and switch to the 'Tests' tab and find the generated 'MyName Tests' and run them.


## Maven settings

The project comes with the auto-public repository configured. To setup the repository in your Maven settings, refer to:

    http://helpx.adobe.com/experience-manager/kb/SetUpTheAdobeMavenRepository.html

## When building content
I have already put some sample contents (/content/assignment/...). But if you want to get started with new contents, then create a root content page with the page template "assignment News Content Page".
Then create relevant news article underneath it.
