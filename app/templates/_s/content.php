<?php
/**
 * @package _s
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('article'); ?>>
	<header class="article__header">
		<h1 class="article__header__title"><a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a></h1>

		<?php if ( 'post' == get_post_type() ) : ?>
		<div class="article__header__meta">
			<?php _s_posted_on(); ?>
		</div>
		<?php endif; ?>

	</header>

	<?php if ( is_search() ) : ?>
	<div class="article--search__summary">
		<?php the_excerpt(); ?>
	</div>

	<?php else : ?>

	<div class="article__content">
		<?php the_content( __( 'Continue reading <span class="meta-nav">&rarr;</span>', '_s' ) ); ?>
		<?php
			wp_link_pages( array(
				'before' => '<div class="page-links">' . __( 'Pages:', '_s' ),
				'after'  => '</div>',
			) );
		?>
	</div>
	<?php endif; ?>

	<footer class="article__footer">
		<?php if ( 'post' == get_post_type() ) : ?>
			<?php
				$categories_list = get_the_category_list( __( ', ', '_s' ) );
				if ( $categories_list && _s_categorized_blog() ) :
			?>
			<span class="article__footer__categories">
				<?php printf( __( 'Posted in %1$s', '_s' ), $categories_list ); ?>
			</span>
			<?php endif; ?>

			<?php
				$tags_list = get_the_tag_list( '', __( ', ', '_s' ) );
				if ( $tags_list ) :
			?>
			<span class="article__footer__tags">
				<?php printf( __( 'Tagged %1$s', '_s' ), $tags_list ); ?>
			</span>
			<?php endif; ?>
		<?php endif; ?>

		<?php if ( ! post_password_required() && ( comments_open() || '0' != get_comments_number() ) ) : ?>
		<span class="article__footer__comments-link"><?php comments_popup_link( __( 'Leave a comment', '_s' ), __( '1 Comment', '_s' ), __( '% Comments', '_s' ) ); ?></span>
		<?php endif; ?>

		<?php edit_post_link( __( 'Edit', '_s' ), '<span class="edit-link">', '</span>' ); ?>
	</footer>
</article>
