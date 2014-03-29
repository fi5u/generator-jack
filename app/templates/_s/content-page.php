<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package _s
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class($classes = array('article', 'article--page')); ?>>
	<header class="header  article__header  article__header--page">
		<h1 class="header__title  article__header-title  article__header-title--page"><?php the_title(); ?></h1>
	</header>

	<div class="article__content  article__content--page">
		<?php the_content(); ?>
		<?php
			wp_link_pages( array(
				'before' => '<div class="article__links  article__links--page">' . __( 'Pages:', '_s' ),
				'after'  => '</div>',
			) );
		?>
	</div>
	<?php edit_post_link( __( 'Edit', '_s' ), '<footer class="footer  article__footer  article__footer--page"><span class="footer__edit-link  article__footer-edit-link  article__footer-edit-link--page">', '</span></footer>' ); ?>
</article>
