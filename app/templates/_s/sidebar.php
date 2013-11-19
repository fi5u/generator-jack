<?php
/**
 * The Sidebar containing the main widget areas.
 *
 * @package _s
 */
?>
    <?php if ( is_active_sidebar( 'sidebar-1' ) ) : ?>
    <div id="secondary" class="widgets" role="complementary">
        <?php do_action( 'before_sidebar' ); ?>
        <?php dynamic_sidebar( 'sidebar-1' ); ?>
    </div>
    <?php endif; ?>